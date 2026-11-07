import { apiClient } from "../../../shared/lib/apiClient";
import type { PublicacionDataType, PublicacionesDataType } from "../../../shared/types/DataType";

const publicacionesService = {

    create: async(titulo: string, archivo: File) => {
        const form = new FormData();
        form.append("titulo", titulo);
        form.append("imagen", archivo);
        
        return apiClient.postForm<PublicacionDataType>("/publicaciones/api/publish", form);
    },

    remove: async(id: number) => {
        return apiClient.delete(`/publicaciones/api/remove/${id}`);
    },

    getAll: async() => {
        return apiClient.get<PublicacionesDataType>('/publicaciones/api/getAll');
    },

    getByUserId: async() => {
        return apiClient.get<PublicacionesDataType>('/publicaciones/api/getByUserId');
    }

}

export default publicacionesService;