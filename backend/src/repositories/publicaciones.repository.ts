import type { PublicacionToInsertType, PublicacionType } from "../models/publicaciones.model.js";
import db from '../db/db.connection.js';
import type { ResultSetHeader, RowDataPacket } from "mysql2";

const toPublicacion = (fila: RowDataPacket): PublicacionType => ({
    id: fila.id,
    titulo: fila.titulo,
    userId: fila.usuario_id,
    imgUrl: fila.foto_url,
    createdAt: fila.created_at,
    imgPublicId: fila.img_public_id
});

export const publicacionesRepository = {

    async selectById(id: number): Promise<PublicacionType | null>{

        const sqlSelect = "SELECT * FROM publicaciones WHERE id = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [id]);

        return resultSelect[0] ? toPublicacion(resultSelect[0]) : null

    },

    async insert(pub: PublicacionToInsertType): Promise<PublicacionType>{

        const sqlInsert = "INSERT INTO publicaciones(titulo, usuario_id, foto_url, img_public_id) VALUES(?, ?, ?, ?)";

        const[resultInsert] = await db.query<ResultSetHeader>(sqlInsert, [pub.titulo, pub.userId, pub.imgUrl, pub.imgPublicId]);

        const publicacion = await this.selectById(resultInsert.insertId);

        if(!publicacion) throw new Error("No se encontró la publicacion despeus del insert");

        return publicacion;
    },

    async delete(id: number): Promise<void>{

        const sqlDelete = "DELETE FROM publicaciones WHERE id = ?";

        await db.query(sqlDelete, [id]);

    },

    async getAll(): Promise<PublicacionType[]>{

        const sqlSelect = "SELECT * FROM publicaciones";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect);

        return resultSelect.map(toPublicacion);
    },

    async getByUser(userId: number): Promise<PublicacionType[]>{

        const sqlSelect = "SELECT * FROM publicaciones WHERE usuario_id = ?";

        const[resultSelect] = await db.query<RowDataPacket[]>(sqlSelect, [userId]);

        return resultSelect.map(toPublicacion);

    }

}