import { useState } from "react";
import type { AuthInputType } from "../types/AuthType";
import authService from "../services/auth.service";
import useErrorMessage from "../../../shared/hooks/useErrorMessages";
import useGetContext from "../../../shared/hooks/useGetContext";

const useLoginUser = () => {

    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();
    const { authCheck } = useGetContext();

    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState("");

    const login = async(loginData: AuthInputType): Promise<boolean> => {

        setLoading(true)
        setMensajeExito("");
        resetearErrores();

        try {

            await authService.login(loginData);
            setMensajeExito("Inicio de sesión exitoso");
            await authCheck();
            return true;

        } catch(err) {

            setErrores(err);
            return false;

        } finally {
            setLoading(false);
        }

    };

    return { login, loading, error, mensajeExito, errorFatal };

};

export default useLoginUser;