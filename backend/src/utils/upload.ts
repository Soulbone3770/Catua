import multer from 'multer';
import { ValidationError } from '../errors/AppError.js';

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if(!TIPOS_PERMITIDOS.includes(file.mimetype)) {
            return cb(new ValidationError("Solo se permiten imagenes JPEG, PNG y WEBP"));
        }
        cb(null, true);
    }
})