import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
require("dotenv").config();

if (!process.env.NODEOS_PRIVATE_KEY) throw new Error("process.env.PRIVATE_KEY is required");

const privateKey = process.env.NODEOS_PRIVATE_KEY;
const endpoint = process.env.NODEOS_ENDPOINT || 'https://localhost:8888';

const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(endpoint, { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


export async function getDefiboxPrice () {

    const table = await rpc.get_table_rows({
        json: true,            // Get the response as json
        code: 'swap.defi',     // Contract that we target
        scope: 'swap.defi',    // Account that owns the data
        table: 'pairs',        // Table name
        lower_bound: 12,       // Table primary key value
        limit: 1,
      });

      return parseFloat(table.rows[0].price0_last);
}