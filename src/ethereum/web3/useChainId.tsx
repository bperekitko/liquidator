import { useEffect, useState } from 'react';
import { useWeb3 } from './useWeb3';

export const useChainId = (): number => {
  const [chainId, setChainId] = useState<number>();
  const web3 = useWeb3();

  useEffect(() => {
    const chainChangedHandler = (chainId: string) => setChainId(parseInt(chainId));

    web3.onChainChanged(chainChangedHandler);

    async function updateChainId(): Promise<void> {
      const chainId = await web3.getChainId();
      setChainId(parseInt(chainId));
    }

    updateChainId();

    return () => web3.removeChainChangedListener(chainChangedHandler);
  }, []);

  return chainId;
};
