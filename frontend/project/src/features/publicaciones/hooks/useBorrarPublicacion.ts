import publicacionesService from "../services/publicaciones.service";
import { useState } from "react";
import { useErrorMessage } from "../../../shared";

const useBorrarPublicacion = () => {

    const[loading, setLoading] = useState(false);
    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const borrar = async(id: number): Promise<boolean> => {

        setLoading(true);
        resetearErrores();

        try {

            await publicacionesService.remove(id);
            return true;

        } catch(err) {

            setErrores(err);
            return false;

        } finally {
            setLoading(false);
        }

    }

    return { borrar, loading, error, errorFatal };

}

export default useBorrarPublicacion;