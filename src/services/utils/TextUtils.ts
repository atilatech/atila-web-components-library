export function formatCurrency(input : number | string, currency = "CAD", convertToInteger=false) {
    if (convertToInteger) {
        input = Number.parseInt(input as string);
    }
    return input.toLocaleString('en-ca', {style : 'currency', currency });
}