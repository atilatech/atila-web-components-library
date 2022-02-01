import React from 'react'
import { Popover } from 'antd';
import { convertCurrency } from '@atila/web-components-library.utils';
import { Currencies, Currency, ETH, USD } from '@atila/web-components-library.models.currency';

interface CurrencyDisplayPropTypes {
    amount: string | number;
    inputCurrency: string;
    outputCurrency: string;
    currencies: {[key: string]: Currency}
};

CurrencyDisplay.defaultProps = {
    inputCurrency: ETH.code,
    outputCurrency: USD.code,
    currencies: Currencies,
}

/**
 * Takes a given currency (default is ETH) and displays it in other currencies.
 * @returns 
 */
function CurrencyDisplay(props: CurrencyDisplayPropTypes) {
    const { amount, inputCurrency, currencies, outputCurrency } = props;
    const content = (
        <div>
            {Object.entries(currencies).map(([currencyCode, currency]) => <p key={currencyCode}> 
                {currency.label}: {convertCurrency(amount as number, inputCurrency, currencyCode, true)}
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
                {convertCurrency(amount as number, inputCurrency, outputCurrency, true)}
            </span>)
            
            </Popover>
        </React.Fragment>
    )
}

export default CurrencyDisplay
