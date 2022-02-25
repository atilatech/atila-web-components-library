import React from 'react';
import { CHAIN_IDS } from '@atila/web-components-library.models.currency'
import { AddOrSwitchBlockChain } from '.';

export function SwitchBinanceSmartChainTestNet() {
  return (
    <AddOrSwitchBlockChain
    chainId={CHAIN_IDS.CHAIN_ID_97.chainId} 
    showAddBlockChain={false} 
    showSwitchBlockChain={true} />
  )
}
export function AddBinanceSmartChainMainNet() {
  return (
    <AddOrSwitchBlockChain 
    chainId={CHAIN_IDS.CHAIN_ID_56.chainId} 
    showAddBlockChain={true} 
    showSwitchBlockChain={false} />
  )
}

export function SwitchEthereumTestNet() {
  return (
    <AddOrSwitchBlockChain chainId={CHAIN_IDS.CHAIN_ID_3.chainId} />
  )
}