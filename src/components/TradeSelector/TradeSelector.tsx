import React from 'react';
import styles from './tradeSelector.module.scss';
import { tokens } from '../../ethereum/arbitrage/SupportedTokens';
import { Token } from '../../ethereum/arbitrage/Token';
import { Dropdown } from '../Dropdown/Dropdown';

interface TradeSelectorProps {
  onToken0Changed: (token: Token) => void;
  onToken1Changed: (token: Token) => void;
}

export function TradeSelector({ onToken0Changed, onToken1Changed }: TradeSelectorProps): JSX.Element {
  const dropdownDomain = tokens.map((t) => {
    return { label: t.ticker, value: t };
  });

  return (
    <div className={styles.trade_selector}>
      <Dropdown
        emptyOptionLabel={'Select token'}
        options={dropdownDomain}
        onOptionSelected={onToken0Changed}
      ></Dropdown>
      <Dropdown
        emptyOptionLabel={'Select token'}
        options={dropdownDomain}
        onOptionSelected={onToken1Changed}
      ></Dropdown>
    </div>
  );
}
