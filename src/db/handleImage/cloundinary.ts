import {v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse} from 'cloudinary';
import Logging from '../../../logging/logging';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY , 
    api_secret: process.env.CLOUDINARY_SECRET 
});

export async function uploadImage(imageBuffer: Buffer):Promise<string|null>{
    try{
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error: UploadApiErrorResponse | undefined, result: UploadApiResponse) => {
              if (error) {
                reject(error); 
              } else {
                resolve(result); 
              }
            });
            uploadStream.end(imageBuffer); 
          });
          return uploadResult.secure_url; 

    }catch (error) {
        Logging.error(error);
        return null;
    }
}