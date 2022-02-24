import ethereumLogo from './assets/ethereumLogo.png';
import binanceLogo from './assets/binanceLogo.png';

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

export interface BlockChain {
    currencyCode: string,
    currencyName: string,
    chainId: number,
    networkName: string,
    isMainNet: boolean,
    blockExplorerUrl: string;
    rpcUrl: string;
    logo: string;
}

/**
 * Use a key CHAIN_ID_{ID} instead of just the numerical ID so that CHAIN_IDS doesn't get converted to numerical index
 */
 export const CHAIN_IDS: { [id: string] : BlockChain; } = {
    CHAIN_ID_1: {
        currencyCode: "ETH",
        currencyName: "Ethereum",
        chainId: 1,
        networkName: "Ethereum Mainnet",
        isMainNet: true,
        blockExplorerUrl: "https://etherscan.io",
        rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        logo: ethereumLogo,
    },
    CHAIN_ID_3: {
        currencyCode: "ETH",
        currencyName: "Ethereum",
        chainId: 3,
        networkName: "Ethereum Ropsten",
        isMainNet: false,
        blockExplorerUrl: "https://ropsten.etherscan.io",
        rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        logo: ethereumLogo,
    },
    CHAIN_ID_56: {
        currencyCode: "BNB",
        currencyName: "Binance Coin",
        chainId: 56,
        networkName: "Binance Smart Chain",
        isMainNet: true,
        blockExplorerUrl: "https://bscscan.com",
        rpcUrl: "https://bsc-dataseed.binance.org/",
        logo: binanceLogo,
    },
    CHAIN_ID_97: {
        currencyCode: "BNB",
        currencyName: "Binance Coin",
        chainId: 97,
        networkName: "Binance Smart Chain Testnet",
        isMainNet: false,
        blockExplorerUrl: "https://testnet.bscscan.com",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        logo: binanceLogo,
    }
}