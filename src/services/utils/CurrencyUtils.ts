/**
 * Remember to put each function you declare here into src/services/utils/index.ts
 */

import { CryptoCurrencies, Currencies, MAXIMUM_DECIMAL_PLACES, MEDIUM_LENGTH_DECIMAL_PLACES } from "@atila/web-components-library.models.currency";



export function formatCurrency(input : number | string, currency = "CAD", convertToInteger=false) {

    input = Number.parseFloat(input as string);

    const isCrypto = Object.keys(CryptoCurrencies).includes(currency);

    let minimumFractionDigits = 2;
    // only show if the number is a crypto and a decimal place or the value is less than 0.00
    if(input !== 0) {
        if((isCrypto && input %1 !== 0)|| input < 10e-2) {
            minimumFractionDigits = MEDIUM_LENGTH_DECIMAL_PLACES;;
        } if (input < 10e-4) {
            minimumFractionDigits = MAXIMUM_DECIMAL_PLACES;
        }
    }

    if (convertToInteger) {
        input = Number.parseInt(input.toLocaleString());
    }
    return input.toLocaleString('en-ca', {style : 'currency', currency, minimumFractionDigits });
}


export function convertCurrency(amount: number, inputCurrency: string, outputCurrency: string, format: boolean = false) {

    let convertedAmount: string|number = amount * Currencies[inputCurrency].USD * 1/ Currencies[outputCurrency].USD;
    if (format) {
        convertedAmount = formatCurrency(convertedAmount, outputCurrency)
    }
    return convertedAmount
}