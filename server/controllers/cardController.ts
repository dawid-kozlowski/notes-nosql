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

    res.json({ status: "success", data: results });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Redis." });
  }
}
