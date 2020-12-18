import { timeout, getTime } from './src/utils';
import { getBinancePrice } from './src/binance';
import { getDefiboxPrice, getDfsPrice } from './src/eos';


(async () => {
    console.log("    Time        Binance      Defibox       DFS      Defi/Binance    DFS/Binance")
    while(true) {

        await Promise.all([ getBinancePrice(), getDefiboxPrice(), getDfsPrice() ])
            .then(([binancePrice, defiboxPrice, dfsPrice]) => {

                const diff1 = 100 * (defiboxPrice - binancePrice) / defiboxPrice;
                const diff2 = 100 * (dfsPrice - binancePrice) / dfsPrice;
                console.log(`${getTime()} |   ${binancePrice.toFixed(4)}   |   ${defiboxPrice.toFixed(4)}  |   ${dfsPrice.toFixed(4)}  |    ${diff1.toFixed(2)}%    |    ${diff2.toFixed(2)}%    |`);
            })
            .catch(err => console.log("Failed to fetch prices.", err));

        await timeout(1000);
    }
})();


