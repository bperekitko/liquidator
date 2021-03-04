import React, { FunctionComponent, useContext } from 'react';
import { Web3State } from './Web3State';
import { useChainId } from './useChainId';
import { useActiveAddress } from './useActiveAddress';
import { useLastBlock } from './useLastBlock';
import { useWeb3 } from './useWeb3';
import { useGasPrice } from './useGasPrice';

const Web3Context = React.createContext<Web3State>({});

export const Web3Provider: FunctionComponent<unknown> = ({ children }) => {
  const valuee = useWeb3Context();
  return <Web3Context.Provider value={valuee}>{children}</Web3Context.Provider>;
};

export const useWeb3State = (): Web3State => {
  const state = useContext(Web3Context);
  if (state === undefined) {
    throw new Error('useWeb3State must be used within a Web3Provider!');
  }
  return state;
};

const useWeb3Context = (): Web3State => {
  const web3 = useWeb3();

  const ethereum = web3.web3Instance.eth;
  const chainId = useChainId();
  const gasPrice = useGasPrice();
  const { activeAddress, setActiveAddress } = useActiveAddress();
  const lastBlock = useLastBlock();
  const initializeProvider = () => web3.initialize(setActiveAddress);

  return { ethereum: ethereum, chainId, gasPrice, activeAddress, lastBlock, initializeProvider };
};
