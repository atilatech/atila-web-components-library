import React, { useState } from 'react';
import { Alert, Button } from 'antd';
import { ethers } from 'ethers';

// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global {
    interface Window {
        ethereum:any;
    }
}

export interface TransactionResponseNetwork extends ethers.providers.TransactionResponse {
    network?: ethers.providers.Network,
}

interface CryptoPaymentFormPropTypes {
    amount: string | number;
    destinationAddress: string;
    isEditableAmount: boolean;
    isEditableDestinationAddress: boolean;
    onError: (message: string) => {};
    onSuccess: (transaction: TransactionResponseNetwork) => {};
}

CryptoPaymentForm.defaultProps = {
    destinationAddress: "0x538642a5f4554A6f42381760F0B51e4203812A82", //tomiwa1a.eth
    isEditableAmount: false,
    isEditableDestinationAddress: false,
    onError: (message: string) => {},
    onSuccess: (transaction: ethers.providers.TransactionResponse) => {},
};

/**
 * @desc A simple form for creating crypto payments.
 */
function CryptoPaymentForm(props: CryptoPaymentFormPropTypes) {

    const { onError, onSuccess, isEditableAmount, isEditableDestinationAddress} = props;

    const [error, setError] = useState("");
    const [transaction, setTransaction] = useState<TransactionResponseNetwork | null >(null);
    const [amount, setAmount] = useState(props.amount);
    const [destinationAddress, setDestinationAddress] = useState(props.destinationAddress)

    const startPayment = async (event: any ) => {

        event.preventDefault();

        try {
          // clear any existing errors from previous calls to startPayment()
          setError("");
          if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
    
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork()
          ethers.utils.getAddress(destinationAddress);
          const transactionResponse = await signer.sendTransaction({
            to: destinationAddress,
            value: ethers.utils.parseEther(amount.toString())
          }) as TransactionResponseNetwork;
          transactionResponse.network = network;
          setTransaction(transactionResponse)
          onSuccess(transactionResponse);

        } catch (err: any) {
          setError(err.message);
          onError(err.message);
        }
      };

    const updatePaymentForm = (event: any) => {
        if (event.target.name === "amount") {
            setAmount(event.target.value);
        } else if (event.target.name === "address") {
            setDestinationAddress(event.target.value);
        }
    }
    
    let transactionUrl = "";

    if (transaction?.hash) {
        transactionUrl = `https://${transaction.network?.name === "homestead" ? "": transaction.network?.name+"."}etherscan.io/tx/${transaction.hash}`
    }

    // Note: This destination address does not distinguish between if the mainnet or Test (e.g. Ropsten) network is being used
    let destinationAddressUrl = `https://etherscan.io/address/${destinationAddress}`;

    return (   
        <div className="m-4 shadow-lg rounded p-4">
            <h1>
                Send ETH payment
            </h1>
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
                <label className="mb-2">Payment Amount (ETH) </label>
                <input
                    className="form-control col-12"
                    type="number"
                    name="amount"
                    value={amount}
                    disabled={!isEditableAmount}
                    onChange={updatePaymentForm}
                />
                <Button
                    type="primary"
                    className="col-12 my-4"
                    onClick={startPayment}
                    style={{height: '40px'}}
                >
                    Confirm Payment of {amount} ETH
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