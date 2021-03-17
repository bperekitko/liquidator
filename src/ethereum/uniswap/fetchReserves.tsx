import { ERC20 } from '../constants/ERC20';
import { Eth } from 'web3-eth';
import { computeSushiswapPairAddress, computeUniswapPairAddress } from './computePairAddress';
import UniswapV2PairAbi from './abi/UniswapV2Pair.json';

export async function fetchUniswapReserves(token0: ERC20, token1: ERC20, ethereum: Eth): Promise<string[]> {
	const address = computeUniswapPairAddress(token0, token1);
	const isContract = await isContractAddress(address, ethereum);
	if (isContract) {
		const pairContract = new ethereum.Contract(UniswapV2PairAbi, address);
		const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();
		return token0.address < token1.address ? [reserve0, reserve1] : [reserve1, reserve0];
	} else {
		return [];
	}
}

export async function fetchSushiswapReserves(token0: ERC20, token1: ERC20, ethereum: Eth): Promise<string[]> {
	const address = computeSushiswapPairAddress(token0, token1);
	const isContract = await isContractAddress(address, ethereum);

	if (isContract) {
		const pairContract = new ethereum.Contract(UniswapV2PairAbi, address);
		const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();
		return token0.address < token1.address ? [reserve0, reserve1] : [reserve1, reserve0];
	} else {
		return [];
	}
}

async function isContractAddress(address: string, ethereum: Eth): Promise<boolean> {
	const contractCode = await ethereum.getCode(address);
	return contractCode !== '0x';
}
