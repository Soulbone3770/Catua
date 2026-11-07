import type { UserType } from "../../users";

export type AuthInputType = Omit<UserType, "id" | "createdAt"> & {
    password: string;
    recuerdame: boolean;
}