import type { RequestHandler } from "express";
import { ValidationError } from "../errors/AppError.js";

export const validateIdParams: RequestHandler = (req, res, next) => {
    
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        throw new ValidationError("El id pasado por params no es válido");
    }

    next();
}