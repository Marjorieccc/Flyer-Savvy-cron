import * as fetchType from './fetchingType';

function parseFlyerId(flyerList: fetchType.FlyerFetched): string {
  return flyerList.id;
}
