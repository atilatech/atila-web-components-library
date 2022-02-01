/**
 * Remember to put each function you declare here into src/services/utils/index.ts
 */

import { CryptoCurrencies, Currencies, MEDIUM_LENGTH_DECIMAL_PLACES } from "@atila/web-components-library.models.currency";



export function formatCurrency(input : number | string, currency = "CAD", convertToInteger=false) {

    const isCrypto = Object.keys(CryptoCurrencies).includes(currency);

    if (convertToInteger) {
        input = Number.parseInt(input as string);
    }
    return input.toLocaleString('en-ca', {style : 'currency', currency, minimumFractionDigits: isCrypto ? MEDIUM_LENGTH_DECIMAL_PLACES : 2 });
}


export function convertCurrency(amount: number, inputCurrency: string, outputCurrency: string, format: boolean = false) {

    let convertedAmount: string|number = amount * Currencies[inputCurrency].USD * 1/ Currencies[outputCurrency].USD;
    if (format) {
        convertedAmount = formatCurrency(convertedAmount, outputCurrency)
    }
    return convertedAmount
}