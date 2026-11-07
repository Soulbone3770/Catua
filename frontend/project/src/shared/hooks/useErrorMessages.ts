import { useCallback, useState } from "react";
import { ApiError } from "../lib/ApiError";
import { esCorregible } from "../lib/errorCodes";

const useErrorMessage = () => {

    const [error, setError] = useState("");
    const [errorFatal, setErrorFatal] = useState("");

    const resetearErrores = useCallback(() => {
        setError("");
        setErrorFatal("");
    },[]);

    const setErrores = useCallback((err: unknown) => {
        if (err instanceof ApiError) {
            if (esCorregible(err.code)) {
                setError(err.message);
            } else {
                setErrorFatal(err.message);
            }
        } else {
            setErrorFatal("Ocurrio un error inesperado");
        }
    },[]);

    return { error, errorFatal, resetearErrores, setErrores }

};

export default useErrorMessage;