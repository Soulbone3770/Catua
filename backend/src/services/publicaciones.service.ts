import { ForbiddenError, NotFoundError } from "../errors/AppError.js";
import type { PublicacionType, PublicPublicacionType } from "../models/publicaciones.model.js";
import { publicacionesRepository } from "../repositories/publicaciones.repository.js";
import { imagesService } from "./images.service.js";

const toPublic = ({imgPublicId, ...rest}: PublicacionType) => rest;

export const publicacionesService = {

    async create(userId: number, titulo: string, buffer: Buffer): Promise<PublicPublicacionType>{

        const imagen = await imagesService.upload(buffer, "publicaciones");

        try {

            const publicacion = await publicacionesRepository.insert({
                titulo: titulo,
                userId: userId,
                imgUrl: imagen.url,
                imgPublicId: imagen.publicId
            });

            return toPublic(publicacion);

        } catch(err) {

            imagesService.delete(imagen.publicId).catch(console.error);
            throw err

        }
    },

    async delete(id: number, userId: number): Promise<void>{

        const publicacion = await publicacionesRepository.selectById(id);

        if(!publicacion) throw new NotFoundError("No se pudo encontrar la publicacion por ese ID");

        if(publicacion.userId !== userId) throw new ForbiddenError("No tienes permiso para borrar esta publicación");

        await publicacionesRepository.delete(id);
        await imagesService.delete(publicacion.imgPublicId).catch(console.error);

    },

    async getAllPubs(): Promise<PublicPublicacionType[]>{

        const publicaciones = await publicacionesRepository.getAll();

        return publicaciones.map((p) => toPublic(p));

    },

    async getPubsByUser(userId: number): Promise<PublicPublicacionType[]>{

        const publicaciones = await publicacionesRepository.getByUser(userId);

        return publicaciones.map(toPublic);

    }
}