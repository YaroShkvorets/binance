const Binance = require('binance-api-node').default

const client = Binance()

exports.getBinancePrice = async function () {

    const book = await client.book({ symbol: 'EOSUSDT' });
    const price = ( parseFloat(book.asks[0].price) + parseFloat(book.bids[0].price) )/2;
    return price;
}
