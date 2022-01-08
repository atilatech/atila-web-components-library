import React from 'react'
import { Popover } from 'antd';
import { formatCurrency } from '@atila/web-components-library.utils';

interface CurrencyDisplayPropTypes {
    amount: string | number;
    inputCurrency: string;
    outputCurrency: string;
    currencies: any
};

const CURRENCIES = {
    CAD: {
        label: "Canadian Dollar",
        ETH: 4137.00
    },
    USD: {
        label: "United States Dollar",
        ETH: 3251.11
    },
    INR: {
        label: "Indian Rupee",
        ETH: 241681.83,
    },
    NGN: {
        label: "Nigerian Naira",
        ETH: 1338789.00,
    }
}

CurrencyDisplay.defaultProps = {
    inputCurrency: "ETH",
    outputCurrency: "CAD",
    currencies: CURRENCIES,
}

/**
 * Takes a given currency (default is ETH) and displays it in other currencies.
 * @returns 
 */
function CurrencyDisplay(props: CurrencyDisplayPropTypes) {
    const { amount, inputCurrency, currencies, outputCurrency } = props;
    const content = (
        <div>
            {Object.keys(currencies).map(currencyCode => <p key={currencyCode}> 
                {currencies[currencyCode].label}: {formatCurrency((amount as number) * currencies[currencyCode][inputCurrency], currencyCode)}
            </p>)}
            <small>Note: These currencies are not updated in realtime.<br/>
             Doublecheck amounts with a secondary source.</small>
        </div>
      );

    return (
        <React.Fragment>
            <Popover content={content} title="Currencies">
            {inputCurrency}{" "}{amount}{" "}
            (<span style={{textDecorationStyle: "dotted", textDecorationLine: "underline"}}>
                {formatCurrency((amount as number) * currencies[outputCurrency][inputCurrency], outputCurrency)}
            </span>)
            
            </Popover>
        </React.Fragment>
    )
}

export default CurrencyDisplay
