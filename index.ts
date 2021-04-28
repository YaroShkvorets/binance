import { timeout, getTime } from './src/utils';
import { getBinancePrice } from './src/binance';
import { getDefiboxPrice, getDfsPrice, getRomePrice } from './src/eos';
import { getHuobiPrice } from './src/huobi';
import { getBitfinexPrice } from './src/bitfinex';
import * as fs from "fs";

const ticker = "EOSPBTC";
const precision = 9;
const csvFilename = `prices-${ticker}.csv`;

(async () => {
    console.log("    Time         Defibox       Binance      Huobi       Bitfinex    Defi/Binance   Defi/Huobi  Defi/Bitfinex")
    fs.writeFile(csvFilename, 'Time,Defibox,DFS,Binance,Huobi,Bitfinex\n', ()=>{});

    while(true) {

        await Promise.all([ getBinancePrice(ticker), getHuobiPrice(ticker), getBitfinexPrice(ticker), getDefiboxPrice(ticker), getDfsPrice(ticker), getRomePrice(ticker)  ])
            .then(([binancePrice, huobiPrice, bitfinexPrice, defiboxPrice, dfsPrice, romePrice]) => {

                const diff1 = 100 * (defiboxPrice - binancePrice) / defiboxPrice;
                const diff2 = 100 * (defiboxPrice - huobiPrice) / defiboxPrice;
                const diff3 = 100 * (defiboxPrice - bitfinexPrice) / defiboxPrice;

                fs.appendFile(csvFilename, `${getTime()},${defiboxPrice.toFixed(precision)},${dfsPrice.toFixed(precision)},${romePrice.toFixed(precision)},${binancePrice.toFixed(precision)},${huobiPrice.toFixed(precision)},${bitfinexPrice.toFixed(precision)}\n`, ()=>{});
                console.log(`${getTime()} |   ${defiboxPrice.toFixed(precision)}    |   ${binancePrice.toFixed(precision)}   |   ${huobiPrice.toFixed(precision)}   |   ${bitfinexPrice.toFixed(precision)}   |    ${diff1.toFixed(2)}%    |    ${diff2.toFixed(2)}%    |    ${diff3.toFixed(2)}%    |`);
            })
            .catch(err => console.log("Failed to fetch prices.", err));

        await timeout(1000);
    }
})();


