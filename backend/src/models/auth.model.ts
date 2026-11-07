import type { UserType } from "./users.model.js";

export type AuthInputType = Omit<UserType, "id" | "createdAt" | "psw"> & {
    password: string;
    recuerdame: boolean;
}

export interface CookieOptionsType{
    httpOnly?: boolean;
    maxAge?: number;
}

export interface CookieResponseType{
    token: string;
    cookieOptions: CookieOptionsType;
}

export interface JwtPayLoad{
    userId: number;
}