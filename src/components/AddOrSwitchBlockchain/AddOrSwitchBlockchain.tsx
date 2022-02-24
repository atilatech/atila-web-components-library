import React from 'react'
// TODO find a way to update CHAIN_IDS import
// import { CHAIN_IDS } from '@atila/web-components-library.models.currency';
import { Button } from 'antd'

export interface AddOrSwitchBlockchainProps {
    chainId: number;
}

export interface BlockChain {
    currencyCode: string,
    currencyName: string,
    chainId: number,
    networkName: string,
    isMainNet: boolean,
    blockExplorerUrl: string;
    rpcUrl: string;
}

/**
 * Use a key CHAIN_ID_{ID} instead of just the numerical ID so that CHAIN_IDS doesn't get converted to numerical index
 */
 export const CHAIN_IDS: { [id: string] : BlockChain; } = {
    CHAIN_ID_1: {
        currencyCode: "ETH",
        currencyName: "Ethereum",
        chainId: 1,
        networkName: "Ethereum Mainnet",
        isMainNet: true,
        blockExplorerUrl: "https://etherscan.io",
        rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    CHAIN_ID_3: {
        currencyCode: "ETH",
        currencyName: "Ethereum",
        chainId: 3,
        networkName: "Ethereum Ropsten",
        isMainNet: false,
        blockExplorerUrl: "https://ropsten.etherscan.io",
        rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    CHAIN_ID_56: {
        currencyCode: "BNB",
        currencyName: "Binance Coin",
        chainId: 56,
        networkName: "Binance Smart Chain",
        isMainNet: true,
        blockExplorerUrl: "https://bscscan.com",
        rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    CHAIN_ID_97: {
        currencyCode: "BNB",
        currencyName: "Binance Coin",
        chainId: 97,
        networkName: "Binance Smart Chain Testnet",
        isMainNet: false,
        blockExplorerUrl: "https://testnet.bscscan.com",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    }
}

function AddOrSwitchBlockchain(props: AddOrSwitchBlockchainProps) {

  const { chainId } = props;

  const chainIdKey = `CHAIN_ID_${chainId}`;

  const chainIdHex = `0x${(chainId).toString(16)}`;

  const targetBlockChain: BlockChain = CHAIN_IDS[chainIdKey];

  const changeBlockchain = async () => {
    const provider = window.ethereum;
    if(!provider){
    console.log("Crypto wallet is not installed, please install!");
    }
    try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
         //  Convert numerical chain ID to hexadecimal string
          params: [{ chainId: chainIdHex}],
        });
      console.log("You have succefully switched to Binance Test network")
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
         console.log("This network is not available in your metamask, please add it");
         addBlockchain();
        }
        console.log("Failed to switch to the network")
      }
  }



  const addBlockchain = async () => {
    const provider = window.ethereum;

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
      } catch (addError) {
         console.log(addError);
  }
  }

  return (
    <div>
        <Button type="primary" onClick={changeBlockchain}>
            Switch to {targetBlockChain.networkName}
        </Button>
    </div>
  )
}

export default AddOrSwitchBlockchain