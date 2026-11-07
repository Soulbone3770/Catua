import { envGetter } from "../utils/envGetter.js";
import { v2 as cloudinary } from 'cloudinary';

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = envGetter();

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
});

export default cloudinary;

