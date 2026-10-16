export interface LoginInput {
    email:string,
    password : string
}

export interface LoginResponse {
    accessToken : string,
    user:{
        id:number,
        name:string,
        email:string,
        role: "ADMIN" | "STAFF" | "DOCTOR" | "PATIENT";
    }
}