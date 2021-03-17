import React from 'react';
import styles from './tradeSelector.module.scss';
import { ERC20Tokens } from '../../ethereum/constants/ERC20Tokens';
import { Dropdown } from '../Dropdown/Dropdown';
import { NumericInput } from '../NumericInput/NumericInput';
import { useTradeContext } from '../../hooks/useTradeContext';

export function TradeSelector(): JSX.Element {
	const { setInputToken, setOutputToken, setAmount } = useTradeContext();

	const dropdownDomain = ERC20Tokens.map((token) => {
		return { label: token.ticker, value: token };
	});

	return (
		<div className={styles.trade_selector}>
			<Dropdown emptyOptionLabel={'Select token'} options={dropdownDomain} onOptionSelected={setInputToken}></Dropdown>
			<NumericInput valueChangedCallback={setAmount} />
			<Dropdown emptyOptionLabel={'Select token'} options={dropdownDomain} onOptionSelected={setOutputToken}></Dropdown>
		</div>
	);
}
