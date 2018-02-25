import speech from '../voiceSynthesizer.js';
let ExchangeAPI = 'ecKDtixgL775jEe0fKZRAyu32SgG6RAI';

let getCurrentExchange = (originCurrency, desiredCurrency, amount) => {
    fetch(`https://forex.1forge.com/1.0.3/convert?from=${originCurrency}&to=${desiredCurrency}&quantity=${amount}&api_key=${ExchangeAPI}`)
        .then(res => res.json())
        .then(data => speech(data.text));
}

export default getCurrentExchange;
