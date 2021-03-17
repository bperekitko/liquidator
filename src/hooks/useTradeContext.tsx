import { ERC20 } from '../ethereum/constants/ERC20';
import React, { FunctionComponent, useContext, useState } from 'react';

interface TradeState {
	amount?: number;
	setAmount?: (amount: number) => void;
	inputToken?: ERC20;
	setInputToken?: (inputToken: ERC20) => void;
	outputToken?: ERC20;
	setOutputToken?: (outputToken: ERC20) => void;
	basePrice?: number;
	setBasePrice?: (price: number) => void;
}

const TradeContext = React.createContext<TradeState>({});

export const TradeContextProvider: FunctionComponent<unknown> = ({ children }) => {
	const context = createContext();
	return <TradeContext.Provider value={context}>{children}</TradeContext.Provider>;
};

export const useTradeContext = (): TradeState => {
	const state = useContext(TradeContext);
	if (state === undefined) {
		throw new Error('useTradeContext must be used within a TradeContextProvider!');
	}
	return state;
};

const createContext = (): TradeState => {
	const [amount, setAmount] = useState<number>();
	const [inputToken, setInputToken] = useState<ERC20>();
	const [outputToken, setOutputToken] = useState<ERC20>();
	const [basePrice, setBasePrice] = useState<number>();
	return {
		amount,
		setAmount,
		inputToken,
		setInputToken,
		outputToken,
		setOutputToken,
		basePrice,
		setBasePrice,
	};
};
