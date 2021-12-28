import React from 'react';
import CurrencyDisplay from './CurrencyDisplay';
import 'antd/dist/antd.css';

export const BasicCurrencyDisplay = () => (
    <CurrencyDisplay amount={0.01} />
);

export const CurrencyDisplayNaira = () => (
    <CurrencyDisplay amount={0.01} outputCurrency={"NGN"} />
);

export const CurrencyDisplayRupee = () => (
    <CurrencyDisplay amount={0.01} outputCurrency={"INR"} />
);