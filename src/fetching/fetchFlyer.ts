import * as fs from 'fs';
import * as fetchConstant from './config/constant';
import * as fetchConfig from './config/NoFrillsConfig';
import * as fetchType from './fetchingType';
import Logging from '../../logging/logging';

export async function fetchFlyer(
  groceryName: string,
  accessToken: string,
  storeCode: string
): Promise<fetchType.Flyer[] | null> {
  const flyerListUrl: string = fetchConstant.getFlyerListUrl(
    groceryName,
    accessToken,
    storeCode
  );

  try {
    const flyerListFetched: fetchType.FlyerFetched[] = await fetchFlyerDetailList(
      flyerListUrl
    );

    let flyerList: fetchType.Flyer[] = flyerListFetched.map((flyer) => ({
      id: flyer.id,
      validFrom: flyer.valid_from, //   validFrom: new Date(flyer.valid_from),
      validTo: flyer.valid_to,  // validTo: new Date(flyer.valid_to),
      storeId: [storeCode],
      productList: [],
      productDetailsList: []
    }));

    const productListUrl: string[] = flyerList.map((flyer) =>
      fetchConstant.getWeeklyFlyerProductUrl(flyer.id, accessToken)
    );
    const productList: fetchType.Product[][] = await Promise.all(
      productListUrl.map((url) => fetchProductFromFlyer(url))
    );

    flyerList = flyerList.map((flyer, index) => ({
      ...flyer,
      productList: productList[index],
    }));
    return flyerList;
  } catch (error) {
    Logging.error(error);
    return null;
  }
}

async function fetchFlyerDetailList(url: string): Promise<fetchType.FlyerFetched[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Fail to fetch Flyer List. Network response was not ok: ${response.statusText}`
      );
    }
    const flyerList = await response.json();
    return flyerList;
  } catch (error) {
    throw new Error(`Fail to fetch Flyer List: ${error}`);
  }
}

async function fetchProductFromFlyer(url: string): Promise<fetchType.Product[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Fail to fetch Flyer Product List. Network response was not ok: ${response.statusText}`
      );
    }

    const productList = await response.json();

    return productList;
  } catch (error) {
    throw new Error(`Fail to fetch Flyer Product List: ${error}`);
  }
}

export async function writeFlyers() {
  const weeklyFylers = await fetchFlyer(
    fetchConfig.NOFRILLS_GROCERY_NAME,
    fetchConfig.NOFRILLS_ACCESS_TOKEN,
    '7076'
  );

  if (weeklyFylers) {
    weeklyFylers.forEach((flyer) => console.log(flyer.id));
    fs.writeFile('NofrillsFlyers.json', JSON.stringify(weeklyFylers, null, 2), (err) => {
      if (err) throw err;
    });
  } else {
    console.log('No flyers fetched');
  }
}

export async function fetchProductDetailsList(
  productSkuList: string[],
  storeId: string
): Promise<fetchType.ProductDetails[] | null> {
  try {
    const apiKey = await fetchConfig.getApiKey();
    const productDetailList: fetchType.ProductDetails[] = [];
    const failProductList : string[] = [];
    for (const productSku of productSkuList) {
      const url = fetchConfig.getProductDetailUrl(productSku, storeId);
      //console.log(`Fetching: ${productSku}`);
      try {
        const productDetail = await fetchProductDetail(url, apiKey);
        if (productDetail) {
          productDetailList.push(productDetail);
        }
      } catch (error) {
        const status = (error as any).status;
        const text = (error as any).statusText;
        let msg:string;
        msg = `Failed to fetch ${productSku}: ${status} : ${text}`;
        if(status === 504){
          msg = `Retry ${productSku}: ${status} : ${text}`
        }
         Logging.error(msg);

        failProductList.push(productSku);
      }
    }

    Logging.info("full list: " + failProductList);
    // fs.writeFile('failProsuct.json', JSON.stringify(failProductList, null, 2), (err) => {
    //   if (err) throw err;
    // });

    return productDetailList;
  } catch (error) {
    Logging.error(error);
    return null;
  }
}

export async function fetchProductDetail(
  url: string,
  apiKey: string
): Promise<fetchType.ProductDetails> {
  try {
    const requestHeaders = {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en',
      'Business-User-Agent': 'PCXWEB',
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      Dnt: '1',
      Host: 'api.pcexpress.ca',
      'Is-Helios-Account': 'false',
      Origin: 'https://www.nofrills.ca',
      Origin_session_header: 'B',
      Referer: 'https://www.nofrills.ca/',
      'Sec-Ch-Ua':
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'Site-Banner': 'nofrills',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'X-Apikey': apiKey,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
    });

    if (!response.ok) {
      const error = { status: response.status, statusText: response.statusText };
      throw error;
    }

    const productData = await response.json();

    return productData;
  } catch (error) {
    throw error;
  }
}


// This function is similar to writeflyers, just change to return Flyer[] instead of write in files
export async function fetchFlyerList(groceryName: string, accessToken: string,storeCode: string ):Promise<fetchType.Flyer[]| null>{
  try {
    const weeklyFylers = await fetchFlyer(groceryName, accessToken, storeCode);
    if (weeklyFylers) {
      fs.writeFile('newFlyers.json', JSON.stringify(weeklyFylers, null, 2), (err) => {
        if (err) throw err;
      });
    }
      return weeklyFylers;
  } catch (error){
    Logging.error(error);
    throw error;
  }
}