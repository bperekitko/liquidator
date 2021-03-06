import { LastBlock } from './LastBlock.model';
import { Eth } from 'web3-eth';

export interface Web3State {
  ethereum?: Eth;
  chainId?: number;
  gasPriceInGwei?: number;
  activeAddress?: string;
  lastBlock?: LastBlock;
  initializeProvider?: () => Promise<void>;
}
