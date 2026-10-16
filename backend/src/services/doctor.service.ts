import findAllDoctors, {
    deactivateDoctorById,
} from "../queries/doctor.queries";

import { redis } from "../utils/redis";

const DOCTORS_CACHE_KEY = "doctors:all";

const getAllDoctors = async () => {
    let cachedDoctors: string | null = null;

    // 1. Try reading from Redis
    if (redis.isReady) {
        try {
            cachedDoctors = await redis.get(DOCTORS_CACHE_KEY);
        } catch (error) {
            console.error("Redis cache read failed:", error);
        }
    } else {
        console.warn("Redis unavailable; using PostgreSQL");
    }

    // 2. Return cached data if available and valid
    if (cachedDoctors) {
        try {
            console.log("Redis cache HIT");
            return JSON.parse(cachedDoctors);
        } catch (error) {
            console.error("Invalid cached doctor data:", error);
        }
    }

    // 3. Cache miss or Redis failure: use PostgreSQL
    console.log("Fetching doctors from PostgreSQL");
    const doctors = await findAllDoctors();

    // 4. Cache the result if Redis is available
    if (redis.isReady) {
        try {
            await redis.set(
                DOCTORS_CACHE_KEY,
                JSON.stringify(doctors),
                { EX: 60 }
            );
        } catch (error) {
            console.error("Redis cache write failed:", error);
        }
    }

    // 5. Return database results even if caching fails
    return doctors;
};

const deactivateDoctor = async (id: number) => {
    const doctor = await deactivateDoctorById(id);

    if (redis.isReady) {
        try {
            await redis.del(DOCTORS_CACHE_KEY);
        } catch (error) {
            console.error("Redis cache invalidation failed:", error);
        }
    }

    return doctor;
};

const invalidateDoctorsCache = async (): Promise<void> => {
    if (!redis.isReady) {
        return;
    }

    try {
        await redis.del(DOCTORS_CACHE_KEY);
    } catch (error) {
        console.error("Redis cache invalidation failed:", error);
    }
};

export {
    getAllDoctors,
    deactivateDoctor,
    invalidateDoctorsCache,
};