import Binance from 'binance-api-node'

const tickers = {
    "EOSUSDT": "EOSUSDT",
    "USDTPBTC": "BTCUSDT",
    "EOSPBTC": "EOSBTC"
}



const client = Binance()

export async function getBinancePrice (ticker: string) {

    const book = await client.book({ symbol: tickers[ticker], limit: 5 });
    const price = ( parseFloat(book.asks[0].price) + parseFloat(book.bids[0].price) ) / 2;
    return price;
}
