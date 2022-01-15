import React, { CSSProperties, useEffect, useState } from 'react';
import { Alert, Button } from 'antd';
import { ethers } from 'ethers';
import { Network } from '@ethersproject/networks';
import "./CryptoPaymentForm.css";

// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global {
    interface Window {
        ethereum:any;
    }
}

export const CHAIN_IDS =  {
    BINANCE: {
        NAME: "Binance",
        CURRENCY_CODE: "BNB",
        MAIN_NET: {
            ID: 56
        },
        TEST_NET: {
            NAME: "testnet",
            ID: 97,
        }
    },
    ETHEREUM: {
        NAME: "Ethereum",
        CURRENCY_CODE: "ETH",
        MAIN_NET: {
            ID: 1
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: 3
        }
    }
}

export const MAXIMUM_DECIMAL_PLACES = 8;

export const CRYPTO_IN_USD: any = {
    ETH: 3363.92,
    BNB: 499.98,
}

export interface TransactionResponsePayment extends ethers.providers.TransactionResponse {
    network?: ethers.providers.Network,
    sourceAddress: string;
    destinationAddress: string;
    destinationAmount: number|string;
}

interface CryptoPaymentFormPropTypes {
    /** Amount to send to destination address before gas fees. */
    amount: number;
    destinationAddress: string;
    isTestNet: boolean;
    networkName: string;
    title: string;
    currency: string;
    /** Controls if the amount can be edited. */
    isEditableAmount: boolean;
    isEditableDestinationAddress?: boolean;
    onError: (message: string) => void;
    onSuccess: (transaction: TransactionResponsePayment) => void;
    className: string;
    style: CSSProperties;
}

CryptoPaymentForm.defaultProps = {
    destinationAddress: "0x38103603fEB199fba32be9b3A464877f28e659A7", //atilatech.eth
    isTestNet: true,
    networkName: "",
    title: "",
    currency: "ETH",
    isEditableAmount: false,
    isEditableDestinationAddress: false,
    onError: (message: string) => {},
    onSuccess: (transaction: ethers.providers.TransactionResponse) => {},
    className: "",
    style: {},
};

/**
 * @desc A simple form for creating crypto payments.
 */
function CryptoPaymentForm(props: CryptoPaymentFormPropTypes) {

    const { onError, onSuccess, isEditableAmount, isEditableDestinationAddress, className, style, title, currency } = props;
    let { networkName } = props;

    const [error, setError] = useState("");
    const [transaction, setTransaction] = useState<TransactionResponsePayment | null >(null);
    const [amount, setAmount] = useState(props.amount);
    const [destinationAddress, setDestinationAddress] = useState(props.destinationAddress);
    const [isTestNet, setIsTestNet] = useState(props.isTestNet)

    

    let blockExplorerHost = "etherscan.io";

    if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
        blockExplorerHost = "bscscan.com"
    }
    if (isTestNet) {
        networkName = currency === CHAIN_IDS.BINANCE.CURRENCY_CODE ? CHAIN_IDS.BINANCE.TEST_NET.NAME : CHAIN_IDS.ETHEREUM.ROPSTEN.NAME;
        blockExplorerHost = `${networkName}.${blockExplorerHost}`
    } else {
        networkName = "mainnet"
    }

    const transactionUrl = transaction?.hash ? `https://${blockExplorerHost}/tx/${transaction.hash}` : "";

    // Note: This destination address does not distinguish between if the mainnet or Test (e.g. Ropsten) network is being used
    let destinationAddressUrl = `https://${blockExplorerHost}/address/${destinationAddress}`;

    /**
     * Check that the selected network in the browser matches the network in the user's settings.
     * TODO: Make this code simpler.
     * @param network 
     * @returns 
     */
    const checkCorrectNetwork = (network: Network) => {
        let expectedChainId;

        if (currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE) {
            if (isTestNet) {
                expectedChainId = CHAIN_IDS.ETHEREUM.ROPSTEN.ID;
            } else {
                expectedChainId = CHAIN_IDS.ETHEREUM.MAIN_NET.ID;

            }
        } else if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
            if (isTestNet) {
                expectedChainId = CHAIN_IDS.BINANCE.TEST_NET.ID;
            } else {
                expectedChainId = CHAIN_IDS.BINANCE.MAIN_NET.ID;
            }
        }

        if (network.chainId !== expectedChainId) {
            const actualNetworkName = [CHAIN_IDS.BINANCE.TEST_NET.ID, CHAIN_IDS.ETHEREUM.ROPSTEN.ID].includes(network.chainId) ? "testnet" : "mainnet";
            const actualCurrency = [CHAIN_IDS.BINANCE.MAIN_NET.ID, CHAIN_IDS.BINANCE.TEST_NET.ID].includes(network.chainId)? CHAIN_IDS.BINANCE.CURRENCY_CODE : CHAIN_IDS.ETHEREUM.CURRENCY_CODE;
            return {isCorrectNetwork: false, message: `Change your network in Metamask. Expected "${isTestNet ? "testnet" : "mainnet"}" network (${networkName}) for currency: ${currency}.
             Instead received "${actualNetworkName}" network (${network.name}) for currency: ${actualCurrency}.`}
        }
        return { isCorrectNetwork: true, message: "" }
    }
    
    useEffect(() => {
        setAmount(props.amount);
        setDestinationAddress(props.destinationAddress);
        setIsTestNet(props.isTestNet);
      }, [props.amount, props.destinationAddress, props.isTestNet]);

    const startPayment = async (event: any ) => {

        event.preventDefault();

        try {
          // clear any existing errors from previous calls to startPayment()
          setError("");
          if (!window.ethereum) {
            throw new Error("No crypto wallet found. Please install it.");
          }
    
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          const signer = provider.getSigner();
          const network = await provider.getNetwork();

          const { isCorrectNetwork, message } = checkCorrectNetwork(network);

          if (!isCorrectNetwork) {
              throw new Error(message)
          }

          ethers.utils.getAddress(destinationAddress);
          const transactionResponse = await signer.sendTransaction({
            to: destinationAddress,
            // Sometimes when performing float division we might get a number with some decimal places that is less than 1 wei (1e-18)
            // Which was causing this error: 
            // fractional component exceeds decimals (fault="underflow", operation="parseFixed", code=NUMERIC_FAULT, version=bignumber/5.5.0)
            // So we need to fix the number of decimal places to MAXIMUM_DECIMAL_PLACES https://github.com/ethers-io/ethers.js/issues/648 to prevent an underflow
            value: ethers.utils.parseEther(amount.toFixed(MAXIMUM_DECIMAL_PLACES).toString())
          }) as TransactionResponsePayment;
          transactionResponse.network = network;
          transactionResponse.destinationAmount = amount.toString();

          setTransaction(transactionResponse)
          onSuccess(transactionResponse);

        } catch (err: any) {
          setError(err.message);
          onError(err.message);
          console.log({error});
        }
      };

    const updatePaymentForm = (event: any) => {
        if (event.target.name === "amount") {
            setAmount(event.target.value);
        } else if (event.target.name === "address") {
            setDestinationAddress(event.target.value);
        }
    }

    return (   
        <div className={`CryptoPaymentForm ${className} shadow-lg rounded p-4`} style={style}>
            {title && 
                <h1>
                    {title}
                </h1>
            }
            <div className="text-left">
            <label className="mb-2">
                Destination Address: {destinationAddress}<br/>
                <a href={destinationAddressUrl} target="_blank" rel="noopener noreferrer">
                View Address
                </a>
             </label><br/>
            {isEditableDestinationAddress && 
                <>
                <label className="mb-2">Destination Address </label>
                <input
                    className="form-control col-12 mb-4"
                    name="address"
                    value={destinationAddress}
                    onChange={updatePaymentForm}
                />
                </>
                }
                <label className="mb-2">Payment Amount ({currency}) </label>
                <input
                    className="form-control col-12"
                    type="number"
                    name="amount"
                    value={amount.toFixed(MAXIMUM_DECIMAL_PLACES)}
                    disabled={!isEditableAmount}
                    onChange={updatePaymentForm}
                />
                <Button
                    type="primary"
                    className="col-12 my-4"
                    onClick={startPayment}
                >
                    Confirm Payment <br/>
                    {amount.toFixed(MAXIMUM_DECIMAL_PLACES)} {currency}
                </Button>

                {
                    transactionUrl &&
                    <Alert
                        type="success"
                        message={<p className="my-2"> 
                        Payment Complete: <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
                        View Transaction
                        </a>
                    </p>}
                    />
                    
                }
                {error && 
                <Alert
                    type="error"
                    message={error}
                />
                }
            </div>
        </div>
    )
}

export default CryptoPaymentForm