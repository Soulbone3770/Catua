
export interface UserType{
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export type NewUserType = Omit<UserType, "id" | "createdAt"> & {
    password: string;
}