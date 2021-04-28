import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { fetch } from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
require("dotenv").config();

if (!process.env.NODEOS_PRIVATE_KEY) throw new Error("process.env.PRIVATE_KEY is required");

const privateKey = process.env.NODEOS_PRIVATE_KEY;
const endpoint = process.env.NODEOS_ENDPOINT || 'https://localhost:8888';

const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(endpoint, { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const defibox_pairs = {
  "EOSUSDT": { id: 12, reversed: false},
  "USDTPBTC": { id: 714, reversed: true},
  "EOSPBTC": { id: 177, reversed: false}
}

export async function getDefiboxPrice (ticker: string) {

    if(!(ticker in defibox_pairs)) return 0;
    const table = await rpc.get_table_rows({
        json: true,            // Get the response as json
        code: 'swap.defi',     // Contract that we target
        scope: 'swap.defi',    // Account that owns the data
        table: 'pairs',        // Table name
        lower_bound: defibox_pairs[ticker].id,       // Table primary key value
        limit: 1,
      });

      return defibox_pairs[ticker].reversed ? parseFloat(table.rows[0].price1_last) : parseFloat(table.rows[0].price0_last);
}


const dfs_pairs = {
  "EOSUSDT": { id: 17, reversed: false, mult: 1},
  "USDTPBTC": { id: 484, reversed: true, mult: 1},
  "EOSPBTC": { id: 485, reversed: false, mult: 0.0001}
}

export async function getDfsPrice (ticker: string) {

    if(!(ticker in dfs_pairs)) return 0;
    const pair = dfs_pairs[ticker];

    const table = await rpc.get_table_rows({
        json: true,
        code: 'defisswapcnt',
        scope: 'defisswapcnt',
        table: 'markets',
        lower_bound: pair.id,
        limit: 1,
    });

    return pair.reversed ? parseFloat(table.rows[0].price1_last) * pair.mult : parseFloat(table.rows[0].price0_last) * pair.mult;
}

const rome_pairs = {
  "EOSUSDT": { id: 1, reversed: false},
  "EOSPBTC": { id: 2, reversed: false}
}

export async function getRomePrice (ticker: string) {

  if(!(ticker in rome_pairs)) return 0;

  const table = await rpc.get_table_rows({
      json: true,
      code: 'swap.rome',
      scope: 'swap.rome',
      table: 'markets',
      lower_bound: rome_pairs[ticker].id,
      limit: 1,
    });

    return rome_pairs[ticker].reversed ? parseFloat(table.rows[0].price1_last) : parseFloat(table.rows[0].price0_last);
}