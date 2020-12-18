import { timeout, getTime } from './src/utils';
import { getBinancePrice } from './src/binance';
import { getDefiboxPrice, getDfsPrice } from './src/eos';
import { getHuobiPrice } from './src/huobi';


(async () => {
    console.log("    Time         Defibox       Binance      Huobi       Defi/Binance   Defi/Huobi")
    while(true) {

        await Promise.all([ getBinancePrice(), getHuobiPrice(), getDefiboxPrice(), getDfsPrice() ])
            .then(([binancePrice, huobiPrice, defiboxPrice]) => {

                const diff1 = 100 * (defiboxPrice - binancePrice) / defiboxPrice;
                const diff2 = 100 * (defiboxPrice - huobiPrice) / defiboxPrice;
                console.log(`${getTime()} |   ${defiboxPrice.toFixed(4)}    |   ${binancePrice.toFixed(4)}   |   ${huobiPrice.toFixed(4)}   |    ${diff1.toFixed(2)}%    |    ${diff2.toFixed(2)}%    |`);
            })
            .catch(err => console.log("Failed to fetch prices.", err));

        await timeout(1000);
    }
})();


