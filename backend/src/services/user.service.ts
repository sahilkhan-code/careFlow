import { findUserByEmail } from "../queries/user.query";

export const getUserByEmail = async (email:String){
    return await findUserByEmail(email);
}