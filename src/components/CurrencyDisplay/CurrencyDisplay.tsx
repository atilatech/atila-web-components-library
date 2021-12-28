import React from 'react'
import { Popover } from 'antd';
import { formatCurrency } from '@atila-web-components-library/utils';

interface CurrencyDisplayPropTypes {
    amount: string | number;
    inputCurrency: string;
    outputCurrency: string;
    currencies: any
};

const CURRENCIES = {
    CAD: {
        label: "Canadian Dollar",
        ETH: 5146.82
    },
    USD: {
        label: "United States Dollar",
        ETH: 3945.76
    },
    INR: {
        label: "Indian Rupee",
        ETH: 301317.73,
    },
    NGN: {
        label: "Nigerian Naira",
        ETH: 1654520.77,
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
