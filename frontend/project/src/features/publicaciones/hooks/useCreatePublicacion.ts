import { useState } from "react";
import useErrorMessage from "../../../shared/hooks/useErrorMessages";
import type { PublicacionType } from "..";
import publicacionesService from "../services/publicaciones.service";

const useCreatePublicacion = () => {

    const[loading, setLoading] = useState(false);
    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const crear = async(titulo: string, archivo: File): Promise<PublicacionType | null> => {

        setLoading(true);
        resetearErrores();

        try {

            const data = await publicacionesService.create(titulo, archivo);
            return data.publicacion ?? null;

        } catch(err) {

            setErrores(err);
            return null;

        } finally {
            setLoading(false);
        }
    }

    return { crear, loading, error, errorFatal };

}

export default useCreatePublicacion;