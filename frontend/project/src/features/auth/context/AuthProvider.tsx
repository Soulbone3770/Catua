import type React from "react";
import { AuthContext } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import { authService } from "..";
import useErrorMessage from "../../../shared/hooks/useErrorMessages";
import type { UserType } from "../../users";

const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [autenticado, setAutenticado] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const authCheck = useCallback(async() => {
        
        setLoading(true);
        resetearErrores();

        try {

            const data = await authService.authCheck();
            setAutenticado(data.autenticado ?? false);
            setUser(data.user ?? null);

        } catch (err) {
            setAutenticado(false);
            setErrores(err);
        } finally {
            setLoading(false);
        }
        
    },[resetearErrores, setErrores]);

    useEffect(() => {
        const check = async() => {
            await authCheck();
        }

        check();
    },[authCheck]);

    return (
        <AuthContext value={{authCheck, autenticado, user, error, errorFatal, loading}}>
            {children}
        </AuthContext>
    )

};

export default AuthProvider;