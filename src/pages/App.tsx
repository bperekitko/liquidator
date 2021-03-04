import React, { FunctionComponent, useState } from 'react';
import styles from './app.module.scss';
import { WalletConnector } from '../components/WalletConnector/WalletConnector';
import { TradeSelector } from '../components/TradeSelector/TradeSelector';
import { Token } from '../ethereum/arbitrage/Token';
import { UniswapPrice } from '../components/UniswapPrice/UniswapPrice';
import { SusiswapPrice } from '../components/SushiswapPrice/SusiswapPrice';
import { BlockInfo } from '../components/BlockInfo/BlockInfo';
import { BalancerPrice } from '../components/BalancerPrice/BalancerPrice';
import { Web3Provider } from '../ethereum/web3/Web3Context';

const App: FunctionComponent<Record<string, never>> = () => {
  const [inputToken, setInputToken] = useState<Token>();
  const [outputToken, setOutputToken] = useState<Token>();

  return (
    <Web3Provider>
      <div className={styles.app}>
        <BlockInfo />
        <WalletConnector />
        <TradeSelector onToken0Changed={setInputToken} onToken1Changed={setOutputToken} />
        <div className={styles.platforms}>
          <UniswapPrice token0={inputToken} token1={outputToken} />
          <SusiswapPrice token0={inputToken} token1={outputToken} />
          <BalancerPrice token0={inputToken} token1={outputToken} />
        </div>
      </div>
    </Web3Provider>
  );
};

export default App;
