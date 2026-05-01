import React, { useState } from "react";

const CURRENCIES = {
  USD: { code: "USD", label: "US Dollar", symbol: "$", rate: 1 },
  CAD: { code: "CAD", label: "Canadian Dollar", symbol: "C$", rate: 1.36 },
  ETH: { code: "ETH", label: "Ethereum", symbol: "ETH", rate: 0.0003 },
  BNB: { code: "BNB", label: "Binance Coin", symbol: "BNB", rate: 0.0017 }
};

function convertCurrency(amount, from, to) {
  var fromRate = CURRENCIES[from] ? CURRENCIES[from].rate : 1;
  var toRate = CURRENCIES[to] ? CURRENCIES[to].rate : 1;
  return (amount / fromRate) * toRate;
}

function formatAmount(amount, currency) {
  var curr = CURRENCIES[currency];
  if (!curr) return amount.toFixed(2);
  if (currency === "ETH" || currency === "BNB") return curr.symbol + " " + amount.toFixed(6);
  return curr.symbol + " " + amount.toFixed(2);
}

export function CurrencyConverter(props) {
  var defaultAmount = props.defaultAmount || 100;
  var defaultFrom = props.defaultFrom || "USD";
  var defaultTo = props.defaultTo || "CAD";
  var amountState = useState(defaultAmount);
  var amount = amountState[0];
  var setAmount = amountState[1];
  var fromState = useState(defaultFrom);
  var fromCurrency = fromState[0];
  var setFromCurrency = fromState[1];
  var toState = useState(defaultTo);
  var toCurrency = toState[0];
  var setToCurrency = toState[1];
  var convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
  return React.createElement("div", null,
    React.createElement("h3", null, "Currency Converter"),
    React.createElement("input", { type: "number", value: amount, onChange: function(e) { setAmount(Number(e.target.value) || 0); } }),
    React.createElement("select", { value: fromCurrency, onChange: function(e) { setFromCurrency(e.target.value); } },
      Object.keys(CURRENCIES).map(function(code) { return React.createElement("option", { key: code, value: code }, CURRENCIES[code].label + " (" + code + ")"); })
    ),
    React.createElement("select", { value: toCurrency, onChange: function(e) { setToCurrency(e.target.value); } },
      Object.keys(CURRENCIES).map(function(code) { return React.createElement("option", { key: code, value: code }, CURRENCIES[code].label + " (" + code + ")"); })
    ),
    React.createElement("div", null,
      React.createElement("div", null, formatAmount(amount, fromCurrency) + " ="),
      React.createElement("div", null, formatAmount(convertedAmount, toCurrency))
    )
  );
}

export default CurrencyConverter;
