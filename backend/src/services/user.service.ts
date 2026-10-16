import { findUserByEmail } from "../queries/user.query";

export const getUserByEmail = async (email:string) => {
    return await findUserByEmail(email);
}