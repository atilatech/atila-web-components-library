import React, { useState } from 'react';
import { Alert, Button } from 'antd';
import { ethers } from 'ethers';



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

function CryptoPaymentForm(props: CryptoPaymentFormPropTypes) {

    const { amount, destinationAddress, onError, onSuccess } = props;

    const [error, setError] = useState("");
    const [transaction, setTransaction] = useState<TransactionResponseNetwork | null >(null);

    const startPayment = async (event: any ) => {

        event.preventDefault();

        try {
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
        <div>
            <div className="m-4" onSubmit={startPayment}>
            <div className="shadow-lg rounded">
                <div className="mt-4 p-4">
                <h1 className="r">
                    Send ETH payment
                </h1>
                <div className="">
                    <div className="my-3">
                    <label>Payment Amount (ETH) </label>
                    <input
                        name="ether"
                        value={amount}
                        disabled={true}
                        className="form-control col-12"
                    />
                    </div>
                </div>
                </div>
                <div className="pb-4 px-4">
                <Button
                    type="primary"
                    className="col-12"
                    onClick={startPayment}
                    style={{height: '40px'}}
                >
                    Confirm Payment of {amount} ETH
                </Button>
                {
                    transactionUrl &&
                    <p className="my-2"> 
                        Payment Complete: <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
                        View Transaction
                        </a>
                    </p>
                }
                {error && 
                <Alert
                    type="error"
                    message={error}
                />
                }
                </div>
            </div>
            </div>
        </div>
    )
}

export default CryptoPaymentForm