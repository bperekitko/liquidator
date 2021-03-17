import { Swap } from '@balancer-labs/sor/dist/types';
import { useWeb3 } from '../web3/useWeb3';

const SWAPS_TUPLE_SOLIDITY_TYPES = '(address,address,address,uint256,uint256,uint256)[][]';

export function encodeSwaps(swaps: Swap[][]): string {
	const { web3Instance } = useWeb3();
	const swapsAsTuples = convertToTupleArray(swaps);
	return web3Instance.eth.abi.encodeParameter(SWAPS_TUPLE_SOLIDITY_TYPES, swapsAsTuples);
}

function convertToTupleArray(swaps: Swap[][]): string[][][] {
	return swaps.map((outerSwap) =>
		outerSwap.map((swap) => {
			const { pool, tokenIn, tokenOut, swapAmount, limitReturnAmount, maxPrice } = swap;
			return [pool, tokenIn, tokenOut, swapAmount, limitReturnAmount, maxPrice];
		})
	);
}
