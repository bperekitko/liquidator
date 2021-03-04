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

export function useWeb3(): EthereumProvider {
  const provider = getProvider();

  const initializeProvider = async (callback: (account: string) => void) => {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    callback(accounts[0]);
  };

  return {
    web3Instance: new Web3(provider),
    initialize: initializeProvider,
    getChainId: () => provider.request({ method: 'eth_chainId' }),
    onAccountsChanged: (callback) => provider.on('accountsChanged', callback),
    onChainChanged: (callback) => provider.on('chainChanged', callback),
    removeChainChangedListener: (listener) => provider.removeListener('chainChanged', listener),
    removeAccountsChangedListener: (listener) => provider.removeListener('accountsChanged', listener),
  };
}

const getProvider = () => {
  const provider = window['ethereum'];
  if (!provider) {
    throw new Error('No ethereum provider detected! This app needs Metamask to run!');
  }
  provider.autoRefreshOnNetworkChange = false;

  return provider;
};
