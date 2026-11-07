import type {Request, Response, NextFunction} from 'express';
import { UnauthenticatedError } from '../errors/AppError.js';
import type { JwtPayLoad } from '../models/auth.model.js';
import { envGetter } from './envGetter.js';
import pkg from 'jsonwebtoken';

const jwt = pkg;

const { JWT_SECRET_KEY } = envGetter();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.token;
    if(!token) return res.json({ok: true, autenticado: false});

    try {

        const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayLoad;
 
        req.userId = decoded.userId;

        next();

    } catch(err) {

        if(err instanceof jwt.JsonWebTokenError){
            return next(new UnauthenticatedError("Sesión inválida o vencida"));
        }

        next(err);

    }
}

export default authCheck;