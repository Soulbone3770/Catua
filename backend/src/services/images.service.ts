import cloudinary from "../config/cloudinary.js";
import type { ImagenSubidaType } from "../models/imagenes.model.js";

export const imagesService = {

    upload(buffer: Buffer, carpeta: string): Promise<ImagenSubidaType>{
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: carpeta, resource_type: "image" },
                (error, result) => {
                    if(error || !result) {
                        return reject(new Error(`Cloudinary falló: ${error?.message ?? "sin resultado"}`))
                    }
                    resolve({ url: result.secure_url, publicId: result.public_id });
                }
            )
            stream.end(buffer); 
        })
    },

    async delete(publicId: string): Promise<void>{
        await cloudinary.uploader.destroy(publicId);
    }

}
