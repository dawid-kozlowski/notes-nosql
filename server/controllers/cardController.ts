import type { Request, Response } from "express";
import type { RedisClientType } from "redis";
import { readFileSync } from "fs";

export async function update(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const { key, value } = req.body;
    await redis.set(key, value);
    await redis.sAdd("cards:all", key);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update Redis." });
  }
}

export async function getAll(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const keys = await redis.sMembers("cards:all");
    const pipeline = redis.multi();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    const length = await redis.sCard("cards:all");

    res.json({ status: "success", data: { keys, results, length } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Redis." });
  }
}

export async function remove(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const key = req.query.key as string;
    if (!key) {
      res.status(400).json({ error: "Key required" });
      return;
    }
    await redis.del(key);
    await redis.sRem("cards:all", key);
    console.log("Card removed from DB.");
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete in Redis." });
  }
}

export async function removeAll(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const luaScript = `
      local ids = redis.call('SMEMBERS', 'cards:all')
      for i=1,#ids do
        redis.call('DEL', ids[i])
      end
      redis.call('DEL', 'cards:all')
      return #ids
    `;
    const deletedCount = await redis.eval(luaScript, {
      keys: [],
      arguments: [],
    });
    res
      .status(200)
      .json({ message: `Deleted ${deletedCount} cards successfully.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete all in Redis." });
  }
}

export async function loadLibraryData(
  req: Request,
  res: Response,
  redis: RedisClientType
) {
  try {
    const multi = redis.multi();
    const lines = readFileSync("./lib/loadLibraryData.redis", "utf8").split(
      "\n"
    );

    for (const line of lines) {
      if (!line.trim() || line.startsWith("#")) continue;

      const parts = line.match(/(?:[^\s"]+|"[^"]*")+/g);
      if (!parts || parts.length === 0) continue;

      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1).map((p) => p.replace(/^"|"$/g, ""));

      if (cmd === "set") multi.set(args[0], args.slice(1).join(" "));
      if (cmd === "hset") {
        const obj: any = {};
        for (let i = 1; i < args.length; i += 2) obj[args[i]] = args[i + 1];
        multi.hSet(args[0], obj);
      }
      if (cmd === "sadd") multi.sAdd(args[0], args.slice(1));
      if (cmd === "lpush") multi.lPush(args[0], args.slice(1));
    }

    await multi.exec();

    res.json({
      status: "success",
      message: "Library data successfully loaded in",
    });
  } catch (err) {
    res.status(500).json({ error: "Load failed" });
  }
}

export async function clearLibraryData(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const luaScript = `
      -- Delete 50 books
      for i=1,50 do
        redis.call('DEL', 'book:' .. i)
      end

      -- Delete 20 bookmeta hashes
      for i=1,20 do
        redis.call('DEL', 'bookmeta:' .. i)
      end

      -- Delete single sets and lists
      redis.call('DEL', 'genres')
      for i=1,10 do
        redis.call('DEL', 'recentloans:user' .. i)
      end

      return 'Library data cleared'
    `;

    const result = await redis.eval(luaScript, {
      keys: [],
      arguments: [],
    });

    res.json({ status: "success", message: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear library data." });
  }
}

export async function getLibraryData(
  req: Request,
  res: Response,
  redis: RedisClientType
) {
  try {
    const bookKeys = await redis.keys("book:*");
    const books = await Promise.all(bookKeys.map((key) => redis.get(key)));
    const metaKeys = await redis.keys("bookmeta:*");
    const metas = await Promise.all(metaKeys.map((key) => redis.hGetAll(key)));
    const genres = await redis.sMembers("genres");

    const recentLoansPromises = [];
    for (let i = 1; i <= 10; i++) {
      recentLoansPromises.push(redis.lRange(`recentloans:user${i}`, 0, -1));
    }
    const recentLoans = await Promise.all(recentLoansPromises);

    res.json({
      status: "success",
      data: { books, metas, genres, recentLoans },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch library data." });
  }
}

export async function loadJsonCompany(
  req: Request,
  res: Response,
  redis: RedisClientType
) {
  try {
    const rawData = readFileSync("./lib/dane.json", "utf8");
    const jsonData = JSON.parse(rawData).firma;
    await redis.json.set("firma", ".", jsonData);

    res.json({
      status: "success",
      message: "JSON data loaded.",
    });
  } catch (err: any) {
    console.error("LoadJsonCompany error:", err.message);
    res.status(500).json({ error: "Failed to load JSON data." });
  }
}

export async function demoJsonCommands(
  req: Request,
  res: Response,
  redis: RedisClientType
) {
  try {
    const commands = [
      // 1. Nazwa firmy
      ["json.get", "firma", ".nazwa"],

      // 2. Status aktywnosci
      ["json.type", "firma", ".aktywna"],

      // 3. Imie pierwszego pracownika
      ["json.get", "firma", ".pracownicy[0].imie"],

      // 4. Wynagrodzenie Anny
      ["json.get", "firma", '.pracownicy[?(@.imie=="Anna")].wynagrodzenie'],

      // 5. Liczba pracownikow
      ["json.arrlen", "firma", ".pracownicy"],

      // 6. Budzet dzialu frontend
      ["json.get", "firma", ".dzialy.frontend.budzetRoczny"],

      // 7. Liczba umiejetnosci pierwszego pracownika
      ["json.arrlen", "firma", ".pracownicy[0].umiejetnosci"],

      // 8. Status managera drugiego pracownika
      ["json.get", "firma", ".pracownicy[1].manager"],

      // 9. Klucze dzialow
      ["json.objkeys", "firma", ".dzialy"],

      // 10. Nazwa pierwszego projektu
      ["json.get", "firma", ".projekty[0].nazwa"],

      // 11. Liczba projektow
      ["json.arrlen", "firma", ".projekty"],

      // 12. Srednie wynagrodzenie
      ["json.get", "firma", ".statystyki.srednieWynagrodzenie"],

      // 13. Miasto Anny
      ["json.get", "firma", ".pracownicy[0].adres.miasto"],

      // 14. Technologie dzialu devops
      ["json.get", "firma", ".dzialy.devops.technologie"],

      // 15. Liczba pracownikow w dziale frontend
      ["json.get", "firma", ".dzialy.frontend.liczbaPracownikow"],

      // 16. Typ pola KRS
      ["json.type", "firma", ".krs"],

      // 17. Liczba aktualnych projektow pierwszego pracownika
      ["json.arrlen", "firma", ".pracownicy[0].projekty.aktualne"],

      // 18. Imiona managerow
      ["json.get", "firma", ".pracownicy[?(@.manager==true)].imie"],

      // 19. Dlugosc pola NIP
      ["json.strlen", "firma", ".nip"],

      // 20. Miasta wszystkich pracownikow
      ["json.get", "firma", ".pracownicy[*].adres.miasto"],
    ];

    const results: any[] = [];

    for (const cmd of commands) {
      try {
        const result = await (redis as any).sendCommand(cmd);
        results.push({ command: cmd.join(" "), result });
      } catch (error: any) {
        results.push({ command: cmd.join(" "), error: error.message });
      }
    }

    res.json({ status: "success", results, total: commands.length });
  } catch (err: any) {
    res.status(500).json({ error: "Demo failed" });
  }
}

export async function deleteJsonData(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const deleted = await redis.del("firma");

    if (deleted === 1) {
      res.json({
        status: "success",
        message: "JSON firma data deleted successfully.",
      });
    } else {
      res.json({
        status: "success",
        message: "No JSON firma data found to delete.",
      });
    }
  } catch (err: any) {
    console.error("DeleteJsonData error:", err.message);
    res.status(500).json({ error: "Failed to delete JSON data." });
  }
}
