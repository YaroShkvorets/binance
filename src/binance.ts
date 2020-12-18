import Binance from 'binance-api-node'

const client = Binance()

export async function getBinancePrice () {

    const book = await client.book({ symbol: 'EOSUSDT', limit: 5 });
    const price = ( parseFloat(book.asks[0].price) + parseFloat(book.bids[0].price) ) / 2;
    return price;
}
