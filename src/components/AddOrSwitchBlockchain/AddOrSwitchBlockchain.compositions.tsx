import React from 'react';
import { CHAIN_IDS } from '@atila/web-components-library.models.currency'
import AddOrSwitchBlockchain from './AddOrSwitchBlockchain'

export function SwitchBinanceSmartChainTestNet() {
  return (
    <AddOrSwitchBlockchain 
    chainId={CHAIN_IDS.CHAIN_ID_97.chainId} 
    showAddBlockChain={false} 
    showSwitchBlockChain={true} />
  )
}
export function AddBinanceSmartChainMainNet() {
  return (
    <AddOrSwitchBlockchain 
    chainId={CHAIN_IDS.CHAIN_ID_56.chainId} 
    showAddBlockChain={true} 
    showSwitchBlockChain={false} />
  )
}

export function SwitchEthereumTestNet() {
  return (
    <AddOrSwitchBlockchain chainId={CHAIN_IDS.CHAIN_ID_3.chainId} />
  )
}