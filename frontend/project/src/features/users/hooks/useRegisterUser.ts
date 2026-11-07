import { useState } from "react";
import type { NewUserType } from "../types/UserType";
import { usersService } from "../services/users.service";
import useErrorMessage from "../../../shared/hooks/useErrorMessages";

const useRegisterUser = () => {

    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState("");

    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const register = async(newUser: NewUserType): Promise<boolean> => {

        setLoading(true);
        setMensajeExito("");

        resetearErrores();

        try {

            await usersService.register(newUser);
            setMensajeExito("Usuario registrado correctamente");
            return true;

        } catch(err) {

            setErrores(err);
            return false

        } finally {
            setLoading(false);
        }
    }

    return { loading, error, register, mensajeExito, errorFatal };

};

export default useRegisterUser;