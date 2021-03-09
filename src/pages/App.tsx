import React, { FunctionComponent, useState } from 'react';
import styles from './app.module.scss';
import { WalletConnector } from '../components/WalletConnector/WalletConnector';
import { TradeSelector } from '../components/TradeSelector/TradeSelector';
import { Token } from '../ethereum/arbitrage/Token';
import { UniswapPrice } from '../components/UniswapPrice/UniswapPrice';
import { SushiswapPrice } from '../components/SushiswapPrice/SusiswapPrice';
import { BlockInfo } from '../components/BlockInfo/BlockInfo';
import { BalancerPrice } from '../components/BalancerPrice/BalancerPrice';
import { Web3ContextProvider } from '../ethereum/web3/Web3Context';

const App: FunctionComponent<Record<string, never>> = () => {
  const [inputToken, setInputToken] = useState<Token>();
  const [outputToken, setOutputToken] = useState<Token>();
  const [amount, setAmount] = useState<number>();

  return (
    <Web3ContextProvider>
      <div className={styles.app}>
        <BlockInfo />
        <WalletConnector />
        <TradeSelector onToken0Changed={setInputToken} onToken1Changed={setOutputToken} onAmountChanged={setAmount} />
        <div className={styles.platforms}>
          <UniswapPrice amount={amount} token0={inputToken} token1={outputToken} />
          <SushiswapPrice amount={amount} token0={inputToken} token1={outputToken} />
          <BalancerPrice amount={amount} token0={inputToken} token1={outputToken} />
        </div>
      </div>
    </Web3ContextProvider>
  );
};

export default App;
