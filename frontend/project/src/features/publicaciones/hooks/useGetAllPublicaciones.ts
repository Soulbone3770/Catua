import { useCallback, useEffect, useState } from "react";
import { useErrorMessage } from "../../../shared";
import type { PublicacionType } from "../types/PublicacionType";
import publicacionesService from "../services/publicaciones.service";

const useGetAllPublicaciones = () => {

    const[loading, setLoading] = useState(true);
    const[publicaciones, setPublicaciones] = useState<PublicacionType[] | null>([]);
    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const getAll = useCallback(async() => {

            setLoading(true);
            resetearErrores();

            try {

                const data = await publicacionesService.getAll();
                setPublicaciones(data.publicaciones ?? null);

            } catch(err) {
                setErrores(err);
            } finally {
                setLoading(false);
            }
        },[resetearErrores, setErrores]);

    useEffect(() => {
        let cancelado = false;

        const get = async() => {
            if(!cancelado) await getAll();
        };

        get();

        return () => { cancelado = true }
    },[getAll]);

    return { publicaciones, loading, error, errorFatal, getAll };

};

export default useGetAllPublicaciones;