import speech from '../voiceSynthesizer.js';
let ExchangeAPI = 'ecKDtixgL775jEe0fKZRAyu32SgG6RAI';

async function getCurrentExchange(originCurrency, desiredCurrency, amount) {
    let res = await fetch(`https://forex.1forge.com/1.0.3/convert?from=${originCurrency}&to=${desiredCurrency}&quantity=${amount}&api_key=${ExchangeAPI}`);
    let data = await res.json();
    speech(data.text)
}

export default getCurrentExchange;
