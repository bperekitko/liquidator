import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './app.module.scss';
import { getPriceFor } from '../ethereum/uniswap/getPriceFor';
import WalletConnector from '../components/WalletConnector/WalletConnector';
import TokenSelector from '../components/TokenSelector/TokenSelector';
import { Token } from '../ethereum/arbitrage/Token';

const App: FunctionComponent<Record<string, never>> = () => {
  const [price, setPrice] = useState('');
  const [inputToken, setInputToken] = useState<Token>();
  const [outputToken, setOutputToken] = useState<Token>();

  useEffect(() => {
    setPrice('');
    if (inputToken && outputToken && inputToken.ticker !== outputToken.ticker) {
      getPriceFor(inputToken, outputToken).then((price) => {
        setPrice(price);
      });
    }
  }, [inputToken, outputToken]);

  const onInputTokenChanged = (token: Token) => setInputToken(token);
  const onOutputTokenChanged = (token: Token) => setOutputToken(token);

  return (
    <>
      <div className={styles.app}>
        <WalletConnector></WalletConnector>
        <TokenSelector onToken0Changed={onInputTokenChanged} onToken1Changed={onOutputTokenChanged}></TokenSelector>
        <div>
          {price && (
            <div className={styles.price_label}>
              FOR 1 {inputToken.ticker} BORROWED YOU WILL HAVE TO PAY {price} {outputToken.ticker}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
