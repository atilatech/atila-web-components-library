/**
 * Remember to put each function you declare here into src/services/utils/index.ts
 */

import { Currencies } from "@atila/web-components-library.models.currency";



export function formatCurrency(input : number | string, currency = "CAD", convertToInteger=false) {
    if (convertToInteger) {
        input = Number.parseInt(input as string);
    }
    return input.toLocaleString('en-ca', {style : 'currency', currency });
}


export function convertCurrency(amount: number, inputCurrency: string, outputCurrency: string, format: boolean = false) {

    let convertedAmount: string|number = amount * Currencies[inputCurrency].USD * 1/ Currencies[outputCurrency].USD;
    if (format) {
        convertedAmount = formatCurrency(convertedAmount, outputCurrency)
    }
    return convertedAmount
}