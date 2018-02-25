import currentExchangeAPI from '../API/getCurrentExchangeAPI.js';

let currentExchange = (txtRec) => {

    let supportedCurrencies = {
        USD: '$',
        EUR: '€',
        GBP: '£'
    }

    let keyWords = {
        USD: 'dollars',
        EUR: 'euro',
        GBP: 'pounds'
    }

    let comma = /,/gi;

    //removing the currency symbol and taking the value
    let amount = txtRec.split(' ')[3].slice(1, txtRec.split(' ')[3].length);

    //removing the comma from the number 
    if (amount.includes(',')) {
        amount = amount.replace(comma, '');
    }

    amount = Number(amount);
    let originCurrency = txtRec.split(' ')[3].charAt(0);
    let desiredCurrency = txtRec.split(' ')[5];

    //Taking the correct values from the input
    for (var key in supportedCurrencies) {
        if (supportedCurrencies[key] === originCurrency) {
            originCurrency = key;
        }
    }

    for (var key in keyWords) {
        if (keyWords[key] === desiredCurrency) {
            desiredCurrency = key;
        }
    }

    //fetching the conversion of the currencies
    currentExchangeAPI(originCurrency, desiredCurrency, amount);

}

export default currentExchange;

