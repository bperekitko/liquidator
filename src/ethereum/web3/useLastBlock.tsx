import { useEffect, useState } from 'react';
import { LastBlock } from './LastBlock.model';
import { useWeb3 } from './useWeb3';

export const useLastBlock = (): LastBlock => {
  const [lastBlock, setLastBlock] = useState<LastBlock>();
  const ethereum = useWeb3().web3Instance.eth;

  useEffect(() => {
    async function updateLastBlock(): Promise<void> {
      const currentBlockNumber = await ethereum.getBlockNumber();

      if (lastBlock?.number !== currentBlockNumber) {
        const currentBlock = await ethereum.getBlock(currentBlockNumber);
        const hash = currentBlock.hash;
        const number = currentBlock.number;
        const date = new Date(+currentBlock.timestamp * 1000);
        setLastBlock({ hash, number, date });
      }
    }

    const blockPollingInterval = setInterval(updateLastBlock, 1000);

    return () => clearInterval(blockPollingInterval);
  }, [lastBlock]);

  return lastBlock;
};
