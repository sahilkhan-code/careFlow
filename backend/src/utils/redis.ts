
import { createClient } from "redis";

export const redis = createClient({
    url: process.env.REDIS_URL ?? "redis://localhost:6369",

    disableOfflineQueue: true,

    commandOptions: {
        timeout: 1000,
    },
    socket: {
        connectTimeout: 3000,

        reconnectStrategy: (retries: number) => {
            const delay = Math.min(250 * 2 ** retries, 3000);

            console.log(`Redis reconnect attempt ${retries + 1} in ${delay}ms`)

            return delay;
        }
    }
})

redis.on("error", (error) => {
    console.error("Redis Client Error", error);
})

redis.on('reconnecting', () => {
    console.warn("Redis reconnecting...");
})

redis.on('ready', () => {
    console.log("Redis connection ready");
})

export const connectReddis = async (): Promise<void> => {
    if (!redis.isOpen) {
        await redis.connect();
    }
}