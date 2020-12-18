import { timeout, getTime } from './src/utils';
import { getBinancePrice } from './src/binance';
import { getDefiboxPrice } from './src/eos';


(async () => {
    console.log("    Time       Binance      Defibox      Diff")
    while(true) {

        await Promise.all([ getBinancePrice(), getDefiboxPrice() ])
            .then(([binance_price, defibox_price]) => {

                const diff = 100 * (binance_price - defibox_price) / binance_price;
                console.log(`${getTime()} |  ${binance_price.toFixed(4)}   |   ${defibox_price.toFixed(4)}  |   ${diff.toFixed(2)}%  |`);
            })
            .catch(err => console.log("Failed to fetch prices"));

        await timeout(1000);
    }
})();


