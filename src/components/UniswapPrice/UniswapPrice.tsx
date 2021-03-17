import React from 'react';
import { ERC20 } from '../../ethereum/constants/ERC20';
import { getPriceOnUniswap } from '../../ethereum/uniswap/getPrice';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { useTradeContext } from '../../hooks/useTradeContext';
import { DexPrice } from '../DexPrice/DexPrice';

export function UniswapPrice(): JSX.Element {
	const { ethereum } = useWeb3State();
	const { setBasePrice } = useTradeContext();

	const getPrice = async (amt: number, t0: ERC20, t1: ERC20) => {
		const basePrice = await getPriceOnUniswap(amt, t0, t1, ethereum);
		setBasePrice(+basePrice);
		return basePrice;
	};

	return <DexPrice dexName={'Uniswap'} getPrice={getPrice} arbitrageContractAddress={''} />;
}
