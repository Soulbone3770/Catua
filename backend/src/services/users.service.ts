import { ConflictError, NotFoundError, UnauthenticatedError } from "../errors/AppError.js";
import type { NewUserType, PublicUserType } from "../models/users.model.js"
import { usersRepository } from "../repositories/users.repository.js"
import type { UserType } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import pkg, { type SignOptions } from 'jsonwebtoken';
import { envGetter } from "../utils/envGetter.js";
import type { AuthInputType, CookieOptionsType, CookieResponseType } from "../models/auth.model.js";

const jwt = pkg;

const { JWT_SECRET_KEY } = envGetter();

const toPublic = ({psw, ...rest}: UserType): PublicUserType => rest;

export const usersService = {

    async createNewUser(newUser: NewUserType): Promise<PublicUserType> {

        const usernameExists = await usersRepository.getByUsername(newUser.username);

        if(usernameExists) throw new ConflictError("El nombre de usuario ya existe");

        const hash = await bcrypt.hash(newUser.password, 10);

        const user = await usersRepository.insert({username: newUser.username, email: newUser.email, psw: hash});

        return toPublic(user);
    },

    async getById(id: number): Promise<PublicUserType>{

        const user = await usersRepository.getById(id);

        if(!user) throw new NotFoundError(`Usuario no encontrado por el id ${id}`);

        return user

    },

    async createSesion(userData: AuthInputType): Promise<CookieResponseType>{

        const user = await usersRepository.selectUsernameAndEmail(userData.username, userData.email);

        if(!user) throw new UnauthenticatedError("El nombre de usuario o el correo son incorrectos");

        const auth = await bcrypt.compare(userData.password, user.psw);

        if(!auth) throw new UnauthenticatedError("La contraseña es incorrecta");

        let expiresIn: SignOptions = { expiresIn: "1h" };
        const cookieOptions: CookieOptionsType = { httpOnly: true };

        if(userData.recuerdame === true){
            expiresIn.expiresIn = "730h";
            cookieOptions.maxAge = 1000 * 60 * 60 * 24 * 30;
        }

        const token = jwt.sign(
            {userId: user.id},
            JWT_SECRET_KEY,
            expiresIn
        );

        return { token, cookieOptions };

    }

}