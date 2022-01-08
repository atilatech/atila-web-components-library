import React from 'react';
import './App.css';
import CryptoPaymentForm, { TransactionResponsePayment } from './components/CryptoPaymentForm/CryptoPaymentForm';
import CurrencyDisplay from './components/CurrencyDisplay/CurrencyDisplay';

function App() {

  const onPaymentComplete = (transaction: TransactionResponsePayment ) => { 
    console.log(transaction);
  }
  return (
    <div className="App">
    <CurrencyDisplay amount={0.01} />
    <hr/>
    <CryptoPaymentForm amount={0.01} onSuccess={onPaymentComplete} />
    <hr />
    <CryptoPaymentForm amount={0.01} 
      isEditableAmount={true} 
      isEditableDestinationAddress={true} 
      onSuccess={onPaymentComplete} />
    </div>
  );
}

export default App;
