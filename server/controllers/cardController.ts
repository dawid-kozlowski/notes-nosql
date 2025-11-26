import type { Request, Response } from "express";
import type { RedisClientType } from "redis";

export async function saveCard(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const { key, value } = req.body;
    await redis.set(key, value);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update Redis." });
  }
}

export async function getKey(
  req: Request,
  res: Response,
  redis: RedisClientType
): Promise<void> {
  try {
    const key = req.query.key as string;
    const value = await redis.get(key);
    res.json({ status: "success", data: value });
  } catch (err) {
    res.status(500).json({ error: "Failed to get from Redis." });
  }
}
