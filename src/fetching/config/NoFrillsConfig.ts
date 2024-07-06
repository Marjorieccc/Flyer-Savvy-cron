import * as utils from "../../utils/utils"; 

export const NOFRILLS_GROCERY_NAME = 'nofrills';
export const NOFRILLS_ACCESS_TOKEN = '1063f92aaf17b3dfa830cd70a685a52b';
export const NODRILLS_IMPORTED_STORE_ID = '7076';
export const NODRILLS_GROCERY_ID = 1; // Created record in grocery table already


export const productDetailBaseUrl =
  'https://api.pcexpress.ca/pcx-bff/api/v1/products';

// Factory the url of product detail
export function getProductDetailUrl(
  productSku: string,
  storeId: string
): string {
  const today = new Date();
  const date = utils.getFormattedDate(today);
  const url = `${productDetailBaseUrl}/${productSku}?lang=en&date=${date}&pickupType=SELF_SERVE_FULL&storeId=${storeId}&banner=nofrills`;
  return url;
}

// Extract api key from web
export async function getApiKey(): Promise<string> {
  try {
    const apiKeyUrl =
      'https://assets.loblaws.ca/pcx_bronx_fe_prod/builds/production/3.50.4/2ca8648f/nofrills/4213_app.bundle.js';
    const scriptContent = await fetchApiKeyContent(apiKeyUrl);

    let apiKey: string = '';
    if (scriptContent) {
      apiKey = extractApiKey(
        scriptContent,
        'https://api.pcexpress.ca/pcx-bff/api/v1'
      );
    }

    return apiKey;
  } catch (error) {
    throw new Error('Fail to Fetch Api Key: ' + error);
  }
}

// Fetch the content which includes the api key
async function fetchApiKeyContent(url: string): Promise<string> {
  try {
    const headers = {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'zh-TW,zh;q=0.9',
      Dnt: '1',
      Referer: 'https://www.nofrills.ca/',
      'Sec-Ch-Ua':
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'script',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'cross-site',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    };

    const response = await fetch(url, {
      method: 'Get',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const scriptContent = await response.text();

    return scriptContent;
  } catch (error) {
    throw new Error('Fail to fetch api key Context: ' + { error });
  }
}

// Parse the api key from context
function extractApiKey(context: string, targetUrl: string): string {
  const apiKeyRegex = new RegExp(
    `"apiKey":"(.{0,40})"."sduiBaseUrl":"${targetUrl}"`,
    's'
  );
  const match = context.match(apiKeyRegex);

  if (!match || !match[1]) {
    throw new Error('Unable to find the api key.');
  }

  const apiKey: string = match[1];

  return apiKey;
}
