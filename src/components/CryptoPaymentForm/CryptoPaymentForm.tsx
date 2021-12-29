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
    destinationAddress: string,
    onError: (message: string) => {};
    onSuccess: (transaction: TransactionResponseNetwork) => {};
}

CryptoPaymentForm.defaultProps = {
    destinationAddress: "0x538642a5f4554A6f42381760F0B51e4203812A82", //tomiwa1a.eth
    onError: (message: string) => {},
    onSuccess: (transaction: ethers.providers.TransactionResponse) => {},
};

/**
 * @desc A simple form for creating crypto payments.
 */
function CryptoPaymentForm(props: CryptoPaymentFormPropTypes) {

    const { amount, destinationAddress, onError, onSuccess } = props;

    const [error, setError] = useState("");
    const [transaction, setTransaction] = useState<TransactionResponseNetwork | null >(null);

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

    
    
    let transactionUrl = "";

    if (transaction?.hash) {
        transactionUrl = `https://${transaction.network?.name === "homestead" ? "": transaction.network?.name+"."}etherscan.io/tx/${transaction.hash}`
    }

    return (   
        <div className="m-4 shadow-lg rounded p-4">
            <h1>
                Send ETH payment
            </h1>
                <label className="mb-2">Payment Amount (ETH) </label>
                <input
                    name="ether"
                    value={amount}
                    disabled={true}
                    className="form-control col-12"
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
    )
}

export default CryptoPaymentForm