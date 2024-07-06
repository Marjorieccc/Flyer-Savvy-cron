// This file parse information for adding new flyer from fetched object

import * as fetch from '../fetching/fetchingType';
import * as parseType from './parsingType';
import Logging from '../../logging/logging';

export async function parseFlyer(flyer:fetch.Flyer):Promise<parseType.Flyer|null>{
  try{
    return {
      imported_flyer_id: flyer.id,
      valid_from: flyer.validFrom ?? null,
      valid_to: flyer.validTo ??  null,
    }
  } catch(error){
      Logging.error;
      return null;
  }
}