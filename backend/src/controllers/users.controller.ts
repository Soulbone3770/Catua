import { usersService } from "../services/users.service.js"
import type { Request, Response } from "express"
import { envGetter } from "../utils/envGetter.js";

const { JWT_SECRET_KEY } = envGetter();

export const usersController = {
    
    async register(req: Request, res: Response){
        const user = await usersService.createNewUser(req.body);
        
        res.status(201).json({
            ok: true,
            user
        });
    },

    async getByIdParams(req: Request, res: Response){

        const id = req.params.id;

        const user = await usersService.getById(Number(id));

        res.json({
            ok: true,
            user
        });
    },

    async login(req: Request, res: Response){

        // const { username, email, password, recuerdame } = req.body;

        const { token, cookieOptions } = await usersService.createSesion(req.body);

        res.cookie("token", token, cookieOptions);

        res.json({
            ok: true
        });

    },

    checkAutenticacion(req: Request, res: Response){
        res.json({
            ok: true,
            autenticado: true
        });
    },

    logout(req: Request, res: Response){

        res.clearCookie("token", { httpOnly: true });
        
        res.json({
            ok: true,
            autenticado: false
        });

    }

}