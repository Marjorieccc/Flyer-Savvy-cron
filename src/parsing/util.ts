import Logging from '../../logging/logging';

export async function convertPackageSizeString(packgeString:string):Promise<{ packageSize: number | null, packageUnit: string | null }>{
    try{
        const newString = packgeString.toString().split(' ');
        const  [packageSize, packageUnit] = [parseFloat(newString[0]), newString[1]];
        if(isNaN(packageSize)){
            const msg = `Fail to split ${packgeString} to number and value`;
            Logging.error(msg);
            return { packageSize: null, packageUnit: null };
        }
        return { packageSize, packageUnit };
    } catch(error){
        Logging.error;
        return { packageSize: null, packageUnit: null };
    }
  }
  