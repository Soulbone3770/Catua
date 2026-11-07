
export interface UserType{
    id: number,
    username: string,
    email: string,
    psw: string,
    createdAt: string
}

export type NewUserType = Omit<UserType, "id" | "createdAt" | "psw"> & {
    password: string;
}

export type UserToInsertType = Omit<UserType, "id" | "createdAt">

export type PublicUserType = Omit<UserType, "psw">