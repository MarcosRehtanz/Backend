import "dotenv/config";
import cloudinary from "cloudinary"
const {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env


export const uploadProductImg = async ( photo ) => {
    cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    });

    try {
        const result = await cloudinary.v2.uploader.upload(photo, {
            //here i chose to allow only jpg, png and gif upload
            allowed_formats: ["jpg", "png", "gif"],
            
            /*creates a folder called "prueba" where images will be stored.
            */
            folder: "prueba",
        });
        // console.log(result)
        return `${result.url}`;
        
    } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
    }
}