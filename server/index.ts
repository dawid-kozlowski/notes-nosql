import dotenv from "dotenv";
import express from "express";
import { createClient } from "redis";
import apiRouter from "./routes/api.ts";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

dotenv.config();
const password = process.env.REDIS_PASSWORD;
const PORT = process.env.PORT || 3000;

const redis = createClient({
  username: "default",
  password: password,
  socket: {
    host: "redis-17922.c300.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 17922,
  },
});

app.locals.redis = redis;

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis
  .connect()
  .then(() => "Redis connected.")
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
