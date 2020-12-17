const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
require("dotenv").config();

const endpoint = process.env.NODEOS_ENDPOINT || 'https://api.eosn.io';
const privateKey = process.env.NODEOS_PRIVATE_KEY;

const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc(endpoint, { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


exports.getDefiboxPrice = async function () {

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