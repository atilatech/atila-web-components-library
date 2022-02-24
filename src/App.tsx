import React from 'react';
import './App.css';
import AddOrSwitchBlockchain from './components/AddOrSwitchBlockchain/AddOrSwitchBlockchain';
import CryptoPaymentForm, { TransactionResponsePayment } from './components/CryptoPaymentForm/CryptoPaymentForm';
import { ConfigurableCryptoPaymentForm } from './components/CryptoPaymentForm/CryptoPaymentForm.compositions';
import CurrencyDisplay from './components/CurrencyDisplay/CurrencyDisplay';

function App() {

  const onPaymentComplete = (transaction: TransactionResponsePayment ) => { 
    console.log(transaction);
  }
  return (
    <div className="App container py-5">
      <h1>Atila Web Components Library</h1>

    <AddOrSwitchBlockchain chainId={97} />
    <CurrencyDisplay amount={0.01} />
    <hr/>
    <ConfigurableCryptoPaymentForm />
    <hr />
    <CryptoPaymentForm amount={0.01} 
      isEditableAmount={true} 
      isEditableDestinationAddress={true} 
      onSuccess={onPaymentComplete} />
    </div>
  );
}

export default App;
