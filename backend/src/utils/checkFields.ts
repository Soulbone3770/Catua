import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/AppError.js";

export const checkFields = <T>(fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for(const field of fields){
            if(!req.body[field]){
                throw new ValidationError("Todos los campos son necesarios");
            }
        }

        next();
    }
};