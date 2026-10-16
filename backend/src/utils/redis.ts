
import { createClient } from "redis";

export const redis = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6369"
})

redis.on("error", (error) => {
    console.error("Redis Client Error", error);
})

export const connectReddis = async (): Promise<void> => {
    if (!redis.isOpen) {
        await redis.connect();
    }
}