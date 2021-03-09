import React from 'react';
import styles from './tradeSelector.module.scss';
import { tokens } from '../../ethereum/arbitrage/SupportedTokens';
import { Token } from '../../ethereum/arbitrage/Token';
import { Dropdown } from '../Dropdown/Dropdown';
import { NumericInput } from '../NumericInput/NumericInput';

interface TradeSelectorProps {
  onToken0Changed: (token: Token) => void;
  onToken1Changed: (token: Token) => void;
  onAmountChanged: (amount: number) => void;
}

export function TradeSelector({ onToken0Changed, onToken1Changed, onAmountChanged }: TradeSelectorProps): JSX.Element {
  const dropdownDomain = tokens.map((token) => {
    return { label: token.ticker, value: token };
  });

  return (
    <div className={styles.trade_selector}>
      <Dropdown
        emptyOptionLabel={'Select token'}
        options={dropdownDomain}
        onOptionSelected={onToken0Changed}
      ></Dropdown>
      <NumericInput valueChangedCallback={onAmountChanged} />
      <Dropdown
        emptyOptionLabel={'Select token'}
        options={dropdownDomain}
        onOptionSelected={onToken1Changed}
      ></Dropdown>
    </div>
  );
}
