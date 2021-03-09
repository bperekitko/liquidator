import Web3 from 'web3';
import { EthereumProvider } from './EthereumProvider.model';

const provider = window['ethereum'];
if (!provider) {
  throw new Error('No ethereum provider detected! This app needs Metamask to run!');
}
provider.autoRefreshOnNetworkChange = false;
const web3Instance = new Web3(provider);

export function useWeb3(): EthereumProvider {
  const initializeProvider = async (callback: (account: string) => void) => {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    callback(accounts[0]);
  };

  return {
    web3Instance,
    initialize: initializeProvider,
    getChainId: () => provider.request({ method: 'eth_chainId' }),
    onAccountsChanged: (callback) => provider.on('accountsChanged', callback),
    onChainChanged: (callback) => provider.on('chainChanged', callback),
    removeChainChangedListener: (listener) => provider.removeListener('chainChanged', listener),
    removeAccountsChangedListener: (listener) => provider.removeListener('accountsChanged', listener),
  };
}
