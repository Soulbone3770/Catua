import type { UserToInsertType, UserType } from "../models/users.model.js";
import db from '../db/db.connection.js';
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { isMysqlError } from "../utils/isMysqlError.js";
import { ConflictError } from "../errors/AppError.js";

const toUser = (fila: RowDataPacket): UserType => ({
    id: fila.id,
    username: fila.username,
    email: fila.username,
    psw: fila.psw,
    createdAt: fila.created_at
});

export const usersRepository = {

    async getById(id: number): Promise<UserType | null>{

        const sqlSelect = "SELECT * FROM users WHERE id = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [id]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null

    },

    async getByUsername(username: string): Promise<UserType | null>{

        const sqlSelect = "SELECT * FROM users WHERE username = ?";
        
        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [username]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null;

    },

    async insert(newUser: UserToInsertType): Promise<UserType>{
        try {

            const sqlInsert = "INSERT INTO users(username, email, psw) VALUES(?, ?, ?)";

            const[resultInsert] = await db.query<ResultSetHeader>(sqlInsert, [newUser.username, newUser.email, newUser.psw]);

            const user = await this.getById(resultInsert.insertId);

            if(!user) throw new Error("Usuario no encontrado despues del insert");

            return user;

        } catch(err) {

            if(isMysqlError(err, "ER_DUB_ENTRY")){
                throw new ConflictError("Nombre de usuario repetido")
            }
            throw err
            
        }
    },

    async selectUsernameAndEmail(username: string, email: string): Promise<UserType | null>{

        const sqlSelect = "SELECT * FROM users WHERE username = ? AND email = ?"

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [username, email]);

        return resultSelect[0] ? toUser(resultSelect[0]) : null;

    }

}