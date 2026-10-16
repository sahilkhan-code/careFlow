import jwt from "jsonwebtoken";

const jwt_secreet = process.env.JWT_SECRET || "SECRET";

if (!jwt_secreet) {
    console.warn("JWT_SECRET is not configured.");
}

export const generateAccessToken = (
    payload:{
        userId:number,
        role:string
    }
) => {
    return jwt.sign(payload,jwt_secreet,{expiresIn:"15m"});
}