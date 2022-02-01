
export class Currency {
    code: string = "";
    label: string = "";
    USD: number = 0;
}

export const CAD: Currency = {
    code: "CAD",
    label: "Canadian Dollar",
    USD: 0.79,
};

export const USD: Currency = {
    code: "USD",
    label: "United States Dollar",
    USD: 1.00
};

export const INR: Currency = {
    code: "INR",
    label: "Indian Rupee",
    USD: 0.013,
};

export const NGN: Currency = {
    code: "NGN",
    label: "Nigerian Naira",
    USD: 0.0024,
};

export const ETH: Currency = {
    code: "ETH",
    label: "Ethereum",
    USD: 2752.07,
};

export const BNB: Currency = {
    code: "BNB",
    label: "Binance Coin",
    USD: 383.92,
};

export const Currencies: {[key: string]: Currency} = {
    CAD: CAD,
    USD: USD,
    INR: INR,
    NGN: NGN,
    ETH: ETH,
    BNB: BNB,
}

export const CryptoCurrencies: {[key: string]: Currency} = {
    ETH: ETH,
    BNB: BNB,
}

export const FiatCurrencies: {[key: string]: Currency} = {
    CAD: CAD,
    USD: USD,
    INR: INR,
    NGN: NGN,
}

export const MAXIMUM_DECIMAL_PLACES = 8;
/**
 * Sometimes showing 8 decimal places is too many numbers in the UI.
 * Show only fewer decimal places to keep the UI cleaner.
 */
export const MEDIUM_LENGTH_DECIMAL_PLACES = 4;