import { findUserByEmail } from "../queries/auth.queries";
import { LoginInput, LoginResponse } from "../types/auth.types";
import { generateAccessToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";


export const login = async (input:LoginInput) :  Promise<LoginResponse> =>{

    const user = await findUserByEmail(input.email);

    if(!user){
        throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(input.password, user.passwordHash);

    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    const accessToken = generateAccessToken({
        userId:user.id,
        role:user.role
    });

    return {
        accessToken,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
}