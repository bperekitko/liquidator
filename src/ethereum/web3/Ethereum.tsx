import Web3 from 'web3';
import { Eth } from 'web3-eth';

const provider = window['ethereum'];
provider.autoRefreshOnNetworkChange = false;

const web3 = new Web3(provider);

export const useEthConnector = (): Eth => web3.eth;

export const onAccountsChanged = (callback: (accounts: string[]) => void): void => {
  provider.on('accountsChanged', callback);
};

export const getActiveAddress = async (): Promise<string> => {
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};
