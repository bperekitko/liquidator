import React from 'react';
import { ERC20 } from '../../ethereum/constants/ERC20';
import { getPriceOnSushiswap } from '../../ethereum/uniswap/getPrice';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

export function SushiswapPrice(): JSX.Element {
	const { ethereum } = useWeb3State();

	const getPrice = (amt: number, t0: ERC20, t1: ERC20) => {
		return getPriceOnSushiswap(amt, t0, t1, ethereum);
	};

	return (
		<DexPrice
			dexName={'Sushiswap'}
			getPrice={getPrice}
			arbitrageContractAddress={'0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1'}
		/>
	);
}
