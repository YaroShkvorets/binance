const { timeout, getSecMs } = require('./src/utils.js');
const { getBinancePrice } = require('./src/binance.js');
const { getDefiboxPrice } = require('./src/eos.js');


(async () => {
    console.log("    Time       Binance      Defibox      Diff")
    while(true) {
        const binance_price = await getBinancePrice();
        const eos_price = await getDefiboxPrice();
        const diff = 100 * (binance_price - eos_price) / binance_price;

        console.log(`${getSecMs()} |  ${binance_price.toFixed(4)}   |   ${eos_price.toFixed(4)}  |   ${diff.toFixed(2)}%  |`);
        await timeout(1000);
    }
})();


