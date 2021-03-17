import React, { useEffect, useState } from 'react';
import { ERC20 } from '../../ethereum/constants/ERC20';
import { useSmartOrderRouter } from '../../ethereum/balancer/useSmartOrderRouter';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';
import { encodeSwaps } from '../../ethereum/balancer/encodeSwaps';

export function BalancerPrice(): JSX.Element {
	const { gasPriceInGwei, chainId } = useWeb3State();
	const [encodedSwaps, setEncodedSwaps] = useState<string>();
	const sor = useSmartOrderRouter();

	const getPrice = async (amt: number, inputToken: ERC20, outputToken: ERC20) => {
		const [swaps, price] = await sor.getPrice(amt, inputToken, outputToken);
		const encoded = encodeSwaps(swaps);
		setEncodedSwaps(encoded);
		console.log('Encoded swaps: ', encoded);
		return price;
	};

	useEffect(() => {
		sor.updateGasPrice(gasPriceInGwei);
	}, [gasPriceInGwei]);

	useEffect(() => {
		if (chainId) {
			sor.updateChainId(chainId);
		}
	}, [chainId]);

	return (
		<DexPrice
			dexName={'Balancer'}
			getPrice={getPrice}
			arbitrageContractAddress=""
			encodedContractData={encodedSwaps}
		></DexPrice>
	);
}
