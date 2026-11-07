import { useCallback, useEffect, useState } from "react";
import type { PublicacionType } from "../types/PublicacionType";
import { useErrorMessage } from "../../../shared";
import publicacionesService from "../services/publicaciones.service";

const useGetPublicacionesByUser = () => {

    const[publicaciones, setPublicaciones] = useState<PublicacionType[] | null>([]);
    const[loading, setLoading] = useState(true);
    const { error, errorFatal, resetearErrores, setErrores } = useErrorMessage();

    const getAll = useCallback(async() => {

            setLoading(true);
            resetearErrores();

            try {

                const data = await publicacionesService.getByUserId();
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

        return () => { cancelado = true };

    },[getAll]);

    return { publicaciones, loading, error, errorFatal, getAll}

};

export default useGetPublicacionesByUser;