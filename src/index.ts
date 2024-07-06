import * as fetchConfig from './fetching/config/NoFrillsConfig';
import * as handler from './handling/handle';
import Logging from '../logging/logging';

async function main(){
  try{
      await handler.handler(fetchConfig.NODRILLS_GROCERY_ID, 
                            fetchConfig.NOFRILLS_GROCERY_NAME, 
                            fetchConfig.NOFRILLS_ACCESS_TOKEN, 
                            fetchConfig.NODRILLS_IMPORTED_STORE_ID); 
    } catch(error) {
      Logging.error;
      throw error;
  }
}

main();