import React, { useState } from 'react';
import { Alert, Button, Spin } from 'antd'
import { BlockChain, CHAIN_IDS } from '@atila/web-components-library.models.currency';

// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global {
  interface Window {
      ethereum:any;
  }
}

export interface AddOrSwitchBlockChainProps {
    chainId: number;
    showAddBlockChain: boolean;
    showSwitchBlockChain: boolean;
}

AddOrSwitchBlockChain.defaultProps = {
  showAddBlockChain: true,
  showSwitchBlockChain: false
}

function AddOrSwitchBlockChain(props: AddOrSwitchBlockChainProps) {

  const { chainId, showAddBlockChain, showSwitchBlockChain } = props;

  const provider = window.ethereum;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, setIsPending] = useState("");


  if(!provider){
    return <Alert 
      className="my-2" 
      message="Crypto wallet is not installed, please install one. E.g. Metamask"
      type="error" />;
  }

  const chainIdKey = `CHAIN_ID_${chainId}`;

  const chainIdHex = `0x${(chainId).toString(16)}`;

  const targetBlockChain: BlockChain = CHAIN_IDS[chainIdKey];

  const switchBlockChain = async () => {

    setErrorMessage("");
    
    setIsPending("Switching blockchain");
    try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
         //  Convert numerical chain ID to hexadecimal string
          params: [{ chainId: chainIdHex}],
        });
        setSuccessMessage(`Switched to ${targetBlockChain.networkName}`);
    } catch (error: any) {
        if (error.code === 4902) {
          console.log({error})
          // This error code indicates that the chain has not been added to MetaMask.
          setErrorMessage("This network is not available in your crypto wallet, please add it");
          addBlockChain();
        } else {
          setErrorMessage(error.message);
        }
    }
    setIsPending("");

  }

  const addBlockChain = async () => {
    const provider = window.ethereum;
    setErrorMessage("");

    setIsPending("Adding blockchain");
    try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [ { chainId: chainIdHex, 
            chainName: targetBlockChain.networkName,
            rpcUrls:[targetBlockChain.rpcUrl],                   
            blockExplorerUrls:[targetBlockChain.blockExplorerUrl],  
            nativeCurrency: { 
            symbol: targetBlockChain.currencyCode,   
            decimals: 18
            } }]}
        );
        setSuccessMessage(`Added ${targetBlockChain.networkName}`);
      } 
      catch (error: any) {
        console.log({error});
        setErrorMessage(error.message);
      }

    setIsPending("");
  }


  const AddOrSwitchButton = ({isAddMode, onClick}: {isAddMode: boolean, onClick: ()=> {}}) => {

    return (
      <Button onClick={onClick}>
        <div>
          <span>
            {isAddMode ? "Add " : "Switch to "} {targetBlockChain.networkName}{' '}
          </span>
          <img src={targetBlockChain.logo} width="auto" height="25px" className="pb-1"/>
        </div>
      </Button>
    )
  }

  return (
    <div>
      <Spin spinning={!!isPending} tip={isPending}>

        {showAddBlockChain && 
          <AddOrSwitchButton isAddMode={true} onClick={addBlockChain} />
        }
        {showSwitchBlockChain && 
          <AddOrSwitchButton isAddMode={false} onClick={switchBlockChain} />
        }
        {errorMessage &&
          <Alert className="my-2" message={errorMessage} type="error" />
        }
        {successMessage &&
          <Alert className="my-2" message={successMessage} type="success" />
        }
      </Spin>
    </div>
  )
}

export default AddOrSwitchBlockChain