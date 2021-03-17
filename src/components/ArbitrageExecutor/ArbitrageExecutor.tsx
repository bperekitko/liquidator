import React from 'react';
import { executeArbitrage } from '../../ethereum/arbitrage/executeArbitrage';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { useTradeContext } from '../../hooks/useTradeContext';
import styles from './arbitrageExecutor.module.scss';

interface ArbitrageExecutorProps {
	price: number;
	arbitrageContractAddress: string;
	encodedData?: string;
}

export function ArbitrageExecutor({
	price,
	arbitrageContractAddress,
	encodedData,
}: ArbitrageExecutorProps): JSX.Element {
	const { amount, inputToken, outputToken, basePrice } = useTradeContext();
	const { activeAddress } = useWeb3State();
	const isArbitragePossible = !!price && price > basePrice;

	const onPerformArbitrageClicked = () => {
		executeArbitrage({
			inputToken,
			outputToken,
			amount,
			arbitrageContractAddress,
			senderAddress: activeAddress,
			encodedData,
		});
	};

	return (
		<div className={styles.arbitrage_executor}>
			{isArbitragePossible && (
				<button className={styles.arbitrage_button} onClick={onPerformArbitrageClicked}>
					Arbitrage!
				</button>
			)}
		</div>
	);
}
