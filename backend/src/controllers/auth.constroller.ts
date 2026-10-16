import type { Request, Response, NextFunction } from "express";
import { login } from "../services/auth.service.js";
import { loginSchema } from "../validatores/auth.validator.js";

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            status: false,
            message: "Invalid request",
            errors: validation.error.issues,
        });
    }

    try {
        const result = await login(validation.data);

        return res.json({
            status: true,
            data: result,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Invalid email or password"
        ) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
            });
        }

        return next(error);
    }
};