// Flyer base url
export const FLYER_BASE_URL = 'https://dam.flippenterprise.net/flyerkit';
export const SOURCE = 'hosted2';

// Flyer list url
export function getFlyerListUrl(
    groceryName: string,
    accessToken: string,
    storeCode: string
): string {
    return `${FLYER_BASE_URL}/publications/${groceryName}?source=${SOURCE}&access_token=${accessToken}&store_code=${storeCode}`;
}

// Weekly flyer url
    export function getWeeklyFlyerProductUrl(
    flyerId: string,
    accessToken: string
): string {
    return `${FLYER_BASE_URL}/publication/${flyerId}/products?display_type=all&access_token=${accessToken}`;
}
