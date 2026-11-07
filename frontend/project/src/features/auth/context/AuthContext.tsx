import { createContext } from "react";
import type { UserType } from "../../users";

interface ContextType{
    autenticado: boolean;
    authCheck: () => Promise<void>;
    user: UserType | null;
    error: unknown;
    errorFatal: unknown;
    loading: boolean;
}

export const AuthContext = createContext<ContextType | undefined>(undefined);