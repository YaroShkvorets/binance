import fetch from 'node-fetch';

const tickers = {
    "EOSUSDT": "tEOSUSD",
    "USDTPBTC": "tBTCUSD",
    "EOSPBTC": "tEOSBTC"
}

export async function getBitfinexPrice(key: string) {

    const response = await fetch('https://api-pub.bitfinex.com/v2/ticker/' + tickers[key]);
    const ticker = await response.json();
    return ticker[6];
}

