import 'dotenv/config';

export const envGetter = () => {

    const get = (valor: string) => {
        if(!process.env[valor]){
            throw new Error(`La variable de entorno ${valor} no existe`)
        }

        return process.env[valor];
    }

    const DB_HOST = get("DB_HOST");
    const DB_USER = get("DB_USER");
    const DB_PASSWORD = get("DB_PASSWORD");
    const DB_DATABASE = get("DB_DATABASE");
    const PORT = get("PORT");
    const JWT_SECRET_KEY = get("JWT_SECRET_KEY");
    const CLOUD_NAME = get("CLOUDINARY_CLOUD_NAME");
    const CLOUD_KEY = get("CLOUDINARY_CLOUD_KEY");
    const CLOUD_SECRET = get("CLOUDINARY_CLOUD_SECRET");

    return { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, PORT, JWT_SECRET_KEY, CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET };

}