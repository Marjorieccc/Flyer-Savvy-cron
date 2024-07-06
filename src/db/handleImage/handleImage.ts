import axios from 'axios';
import sharp from 'sharp';
import * as cloudinary from './cloundinary';
import Logging from '../../../logging/logging';

// Save image from URL to buffer
export async function saveImageBuffer(url: string):Promise<Buffer|null>{
    try{
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        return buffer;

    } catch (error){
        Logging.error;
        return null;
    }
}

// Convert image buffer to WebP format
export async function changeToWebp(buffer:Buffer):Promise<Buffer|null>{
    try{
        const webpBuffer = sharp(buffer).webp().toBuffer();
        return webpBuffer;
    } catch (error){
        Logging.error;
        return null;
    }
}

// Handle image processing and uploading    
export async function handleImage(url: string):Promise<string|null>{
    const imageBuffer = await saveImageBuffer(url);
    if(!imageBuffer) return null

    const webpBuffer = await changeToWebp(imageBuffer);
    if(!webpBuffer) return null
   
    const newUrl = await cloudinary.uploadImage(webpBuffer); // Reserve flexibility to change image hosting provider
    //console.log(newUrl);
    if(!newUrl){
        const msg = `Fail to process image from ${url}`;
        Logging.error(msg);
    }
    return newUrl;
}

// const testUrl = "https://assets.shop.loblaws.ca/products/20766719/b1/en/front/20766719_front_a01_@2.png";
// handleImage(testUrl);