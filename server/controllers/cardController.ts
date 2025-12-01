import type { Request, Response } from "express";
import type { RedisClientType } from "redis";

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
        redis.call('DEL', 'card:' .. ids[i])
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
