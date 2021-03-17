import React, { useEffect, useState } from 'react';
import { ERC20 } from '../../ethereum/constants/ERC20';
import styles from './dexPrice.module.scss';
import { Spinner } from '../Spinner/Spinner';
import { useTradeContext } from '../../hooks/useTradeContext';
import { DexLogo } from '../DexLogo/DexLogo';
import { ArbitrageExecutor } from '../ArbitrageExecutor/ArbitrageExecutor';

interface DexPriceProps {
	dexName: string;
	arbitrageContractAddress: string;
	encodedContractData?: string;
	getPrice: (amount: number, token0: ERC20, token1: ERC20) => Promise<string>;
}

export function DexPrice({
	dexName,
	arbitrageContractAddress,
	getPrice,
	encodedContractData,
}: DexPriceProps): JSX.Element {
	const [isLoadingPrice, setIsLoadingPrice] = useState(false);
	const { amount, inputToken, outputToken } = useTradeContext();
	const [price, setPrice] = useState('');

	useEffect(() => {
		const fetchPrice = async () => {
			setPrice('');
			if (amount > 0 && inputToken && outputToken && inputToken.ticker !== outputToken.ticker) {
				setIsLoadingPrice(true);
				const fetchedPrice = await getPrice(amount, inputToken, outputToken);
				setPrice(fetchedPrice);
				setIsLoadingPrice(false);
			}
		};

		fetchPrice();

		const pricePollingInterval = setInterval(fetchPrice, 4000);

		return () => clearInterval(pricePollingInterval);
	}, [amount, inputToken, outputToken]);

	return (
		<div className={styles.dex_price_container}>
			<div className={styles.dex_header}>
				<DexLogo dexName={dexName} />
				<span className={styles.dex_name}>{dexName}</span>
			</div>
			<div className={styles.dex_price_spinner}>
				{isLoadingPrice ? <Spinner size={40} /> : <span className={styles.dex_price}>{price}</span>}
			</div>
			<ArbitrageExecutor
				price={+price}
				arbitrageContractAddress={arbitrageContractAddress}
				encodedData={encodedContractData}
			></ArbitrageExecutor>
		</div>
	);
}
