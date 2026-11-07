import { useState } from "react";
import { useErrorMessage } from "../../../shared";
import authService from "../services/auth.service";
import useGetContext from "../../../shared/hooks/useGetContext";

const useLogoutUser = () => {

    const[loading, setLoading] = useState(false);
    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();
    const { authCheck } = useGetContext();

    const logout = async(): Promise<boolean> => {

        setLoading(true);
        resetearErrores();

        try {

            await authService.logout();
            alert("Cerro sesión exitosamente");
            await authCheck();
            return true

        } catch(err) {
            setErrores(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading, error, errorFatal };

};

export default useLogoutUser;