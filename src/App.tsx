import React from 'react';
import './App.css';
import CryptoPaymentForm from './components/CryptoPaymentForm/CryptoPaymentForm';
import CurrencyDisplay from './components/CurrencyDisplay/CurrencyDisplay';

function App() {
  return (
    <div className="App">
    <CurrencyDisplay amount={0.01} />
    <hr/>
    <CryptoPaymentForm amount={0.01} />
    </div>
  );
}

export default App;
