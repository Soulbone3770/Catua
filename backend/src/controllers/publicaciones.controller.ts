import { ValidationError } from "../errors/AppError.js";
import type { Request, Response } from 'express';
import { publicacionesService } from "../services/publicaciones.service.js";

export const publicacionesController = {

    async publish(req: Request, res: Response) {

        if (!req.file) throw new ValidationError("Tienes que enviar una imagen en el campo 'Imagen'");

        const titulo = req.body?.titulo;
        if (typeof titulo !== "string" || titulo.trim() === "") {
            throw new ValidationError("El título es obligatorio");
        }

        const userId = res.locals.userId;
        const publicacion = await publicacionesService.create(userId, req.body.titulo, req.file.buffer);
        res.status(201).json({
            ok: true,
            publicacion
        });

    },

    async getAll(req: Request, res: Response){

        const publicaciones = await publicacionesService.getAllPubs();

        res.json({
            ok: true,
            publicaciones
        });

    },

    async getByUser(req: Request, res: Response){

        const publicaciones = await publicacionesService.getPubsByUser(Number(res.locals.userId));

        res.json({
            ok: true,
            publicaciones
        });

    },

    async remove(req: Request, res: Response) {

        await publicacionesService.delete(Number(req.params.id), res.locals.userId);

        res.json({
            ok: true
        });
    }

}