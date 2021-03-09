import Web3 from 'web3';

export interface EthereumProvider {
  web3Instance: Web3;
  initialize: (callback: (account: string) => void) => Promise<void>;
  getChainId: () => Promise<string>;
  onChainChanged: (handler: (chainId: string) => void) => void;
  onAccountsChanged: (handler: (accounts: string[]) => void) => void;
  removeChainChangedListener: (listener: (chainId: string) => void) => void;
  removeAccountsChangedListener: (listener: (accounts: string[]) => void) => void;
}
