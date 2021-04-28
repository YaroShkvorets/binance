import fetch from 'node-fetch';

const tickers = {
    "EOSUSDT": "eosusdt",
    "USDTPBTC": "btcusdt",
    "EOSPBTC": "eosbtc"
}


export async function getHuobiPrice(ticker: string) {

    const response = await fetch('https://api.huobi.pro/market/trade?symbol=' + tickers[ticker]);
    const json = await response.json();
    const trade = json.tick.data[0];

    return trade.price;
}

