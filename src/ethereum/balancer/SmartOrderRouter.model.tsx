import { Swap } from '@balancer-labs/sor/dist/types';
import { ERC20 } from '../constants/ERC20';

export interface SmartOrderRouter {
	updateGasPrice: (gasPriceInGwei: number) => void;
	updateChainId: (chainId: number) => void;
	getPrice: (amount: number, input: ERC20, output: ERC20) => Promise<[Swap[][], string]>;
}
