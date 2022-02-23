import React, { useState } from 'react';
import CryptoPaymentForm, { CHAIN_NAMES, CRYPTO_IN_USD, MAXIMUM_DECIMAL_PLACES } from './CryptoPaymentForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import { Radio, Select } from 'antd';

const { Option } = Select;


const paymentAmountOptions = [
    0.10,
    1,
    5,
    10,
    25,
    100,
]

const currencyOptions = [
    {
        name: CHAIN_NAMES.ETHEREUM.NAME,
        value: CHAIN_NAMES.ETHEREUM.CURRENCY_CODE,
    },
    {
        name: CHAIN_NAMES.BINANCE.NAME,
        value: CHAIN_NAMES.BINANCE.CURRENCY_CODE,
    }
]

const networkOptions = [
    {
        value: "testnet",
    },
    {
        value: "mainnet",
    }
]

export const ConfigurableCryptoPaymentForm = () => {

    const [paymentAmount, setPaymentAmount] = useState(0);
    const [currency, setCurrency] = useState(currencyOptions[0].value);
    const [network, setNetwork] = useState(networkOptions[0].value)

    const handleAmountChange = (value: any) => {
      setPaymentAmount(value);
    }

    const handleCurrencyChange = (event: any) => {
        setCurrency(event.target.value);
    }

    const selectAmount = (
      <>
      <Select value={paymentAmount} onChange={handleAmountChange} style={{width: "250px"}} className="mb-3">
          <Option value={0} disabled={true}>{"Select Amount"}</Option>
          {paymentAmountOptions.map(paymentAmountOption => (
              <Option key={paymentAmountOption} value={paymentAmountOption}>{paymentAmountOption.toLocaleString('en-ca', {style : 'currency', currency: "CAD" })}{' '}
               ({currency} {(paymentAmountOption/CRYPTO_IN_USD[currency]).toFixed(MAXIMUM_DECIMAL_PLACES)})
               </Option>
          ))}
      </Select>
    </>
    )
    const selectCurrency = (
        <Radio.Group value={currency} onChange={handleCurrencyChange} optionType="button" buttonStyle="solid" className="mb-3">
            {currencyOptions.map(currencyOption => (<Radio.Button key={currencyOption.value} value={currencyOption.value}>{currencyOption.name}</Radio.Button>))}
      </Radio.Group>
    )
    const selectNetwork = (
        <Radio.Group value={network} onChange={event => setNetwork(event.target.value)} optionType="button" buttonStyle="solid" className="mb-3">
            {networkOptions.map(currencyOption => (<Radio.Button key={currencyOption.value} value={currencyOption.value}>{currencyOption.value}</Radio.Button>))}
      </Radio.Group>
    )
    return (
    <>
    {selectCurrency}<br/>
    {selectNetwork}<br/>
    {selectAmount}
    <CryptoPaymentForm amount={paymentAmount/CRYPTO_IN_USD[currency]} 
    currency={currency} isTestNet={network === "testnet"} isEditableDestinationAddress={true} />
    </>)
};

export const EditableCryptoPaymentForm = () => (
    <CryptoPaymentForm amount={0.01} isEditableAmount={true} isEditableDestinationAddress={true} />
);