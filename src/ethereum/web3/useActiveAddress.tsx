import { useEffect, useState } from 'react';
import { useWeb3 } from './useWeb3';

export const useActiveAddress = (): { activeAddress: string; setActiveAddress: (address: string) => void } => {
  const [activeAddress, setActiveAddress] = useState<string>();
  const web3 = useWeb3();

  useEffect(() => web3.onAccountsChanged((accounts) => setActiveAddress(accounts[0])), []);

  return { activeAddress, setActiveAddress };
};
