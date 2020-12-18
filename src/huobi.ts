import fetch from 'node-fetch';


export async function getHuobiPrice() {

    const response = await fetch('https://api.hbdm.com/api/v1/contract_index');
    const json = await response.json();
    const market = json.data.filter(( obj: any ) => obj.symbol == "EOS")[0];

    return market.index_price;
}

