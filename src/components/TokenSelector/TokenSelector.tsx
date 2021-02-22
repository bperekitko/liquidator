import React from 'react';
import styles from './tokenSelector.module.scss';
import { tokens } from '../../ethereum/arbitrage/SupportedTokens';
import { Token } from '../../ethereum/arbitrage/Token';
import Dropdown from '../Dropdown/Dropdown';

interface TokenSelectorProps {
  onToken0Changed: (token: Token) => void;
  onToken1Changed: (token: Token) => void;
}

export default function TokenSelector({ onToken0Changed, onToken1Changed }: TokenSelectorProps): JSX.Element {
  return (
    <div className={styles.selectContainer}>
      {/* <select className={styles.select} onChange={(event) => onToken0Changed(tokens[event.target.value])}>
        <option hidden disabled selected defaultValue={''}>
          {'Select token'}
        </option>
        {tokens.map((token, index) => (
          <option value={index} key={token.address}>
            `😀 {token.ticker}`
          </option>
        ))}
      </select>
      <span className={styles.arrow} tabIndex={0} />

      <select onChange={(event) => onToken1Changed(tokens[event.target.value])}>
        <option hidden disabled selected defaultValue={''}>
          {'Select token'}
        </option>
        {tokens.map((token, index) => (
          <option value={index} key={token.address}>
            {token.ticker}
          </option>
        ))}
      </select> */}

      <Dropdown></Dropdown>
    </div>
  );
}
