import React from 'react';
import CurrencyDisplay from './CurrencyDisplay';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

export const BasicCurrencyDisplay = () => (
    <CurrencyDisplay amount={1} />
);

export const CurrencyDisplayETH = () => (
    <CurrencyDisplay amount={1.5} inputCurrency="ETH" />
);

export const CurrencyDisplayETHToBNB = () => (
    <CurrencyDisplay amount={1} inputCurrency="ETH" outputCurrency="BNB" />
);

export const CurrencyDisplayBNBToNaira = () => (
    <CurrencyDisplay amount={0.5} inputCurrency="BNB" outputCurrency="NGN" />
);

export const CurrencyDisplayUSDToCAD = () => (
    <CurrencyDisplay amount={1500} inputCurrency="USD" outputCurrency="CAD" />
);

export const CurrencyDisplayNaira = () => (
    <CurrencyDisplay amount={100} outputCurrency="NGN" />
);

export const CurrencyDisplayRupee = () => (
    <CurrencyDisplay amount={100} outputCurrency="INR" />
);
