import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../errors/AppError.js";
import multer from 'multer';

const codeToError = {
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "VALIDATION": 400,
    "UNAUTHENTICATED": 401,
    "FORBIDDEN": 403
};

export const notFoundErrorHandler: RequestHandler = (req, res, next) => {
    next(new NotFoundError("Ruta no encontrada"));
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (res.headersSent) return next(err);

    if(err instanceof AppError){
        return res.status(codeToError[err.code]).json({
            ok: false,
            code: err.code,
            error: err.message
        });
    };

    if(err instanceof multer.MulterError){
        const mensaje = err.code === "LIMIT_FILE_SIZE"
            ? "La imagen supera el máximo de 5MB"
            : "Archivo inválido"
        return res.status(400).json({
            ok: false,
            code: "VALIDATION",
            error: mensaje
        });
    }

    console.error(err);
    res.status(500).json({
        ok: false,
        code: "INTERNAL",
        error: "Error interno del servidor"
    });

}