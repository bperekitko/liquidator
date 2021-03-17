import React, { FunctionComponent } from 'react';
import styles from './app.module.scss';
import { WalletConnector } from '../components/WalletConnector/WalletConnector';
import { TradeSelector } from '../components/TradeSelector/TradeSelector';
import { UniswapPrice } from '../components/UniswapPrice/UniswapPrice';
import { SushiswapPrice } from '../components/SushiswapPrice/SusiswapPrice';
import { BlockInfo } from '../components/BlockInfo/BlockInfo';
import { BalancerPrice } from '../components/BalancerPrice/BalancerPrice';
import { Web3ContextProvider } from '../ethereum/web3/Web3Context';
import { TradeContextProvider } from '../hooks/useTradeContext';

const App: FunctionComponent<Record<string, never>> = () => {
	return (
		<Web3ContextProvider>
			<div className={styles.app}>
				<BlockInfo />
				<WalletConnector />
				<TradeContextProvider>
					<TradeSelector />
					<div className={styles.platforms}>
						<UniswapPrice />
						<SushiswapPrice />
						<BalancerPrice />
					</div>
				</TradeContextProvider>
			</div>
		</Web3ContextProvider>
	);
};

export default App;
