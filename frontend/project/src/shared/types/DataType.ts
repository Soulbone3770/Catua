import type { PublicacionType } from "../../features/publicaciones";
import type { UserType } from "../../features/users";

export interface DataType{
    ok: boolean;
    code?: string;
    error?: string;
}

export interface UserDataType extends DataType{
    user?: UserType;
}

export interface AuthDataType extends DataType{
    autenticado: boolean;
    user?: UserType;
}

export interface PublicacionDataType extends DataType{
    publicacion?: PublicacionType;
}

export interface PublicacionesDataType extends DataType{
    publicaciones?: PublicacionType[];
}