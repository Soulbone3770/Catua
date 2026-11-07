// middleware/auth.ts
import jwt from "jsonwebtoken";
import { envGetter } from "./envGetter.js";
import { UnauthenticatedError } from "../errors/AppError.js";
import type { RequestHandler } from "express";
import type { JwtPayLoad } from "../models/auth.model.js";

const { JWT_SECRET_KEY } = envGetter();

export const auth: RequestHandler = (req, res, next) => {

  const token = req.cookies.token;
  
  if (!token) return next(new UnauthenticatedError("Debes iniciar sesión"));

  try {

    const decript = jwt.verify(token, JWT_SECRET_KEY) as JwtPayLoad;

    res.locals.userId = decript.userId; 

    next();

  } catch (err) {

    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthenticatedError("Sesión inválida o vencida"));
    }

    next(err);
  }
};