import { ERC20 } from './ERC20';

const DAI: ERC20 = {
	address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
	ticker: 'DAI',
	decimals: 18,
};

const WETH: ERC20 = {
	address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
	ticker: 'WETH',
	decimals: 18,
};

const USDC: ERC20 = {
	address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
	ticker: 'USDC',
	decimals: 6,
};

const WBTC: ERC20 = {
	address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
	ticker: 'WBTC',
	decimals: 8,
};

export const ERC20Tokens: ERC20[] = [DAI, WETH, USDC, WBTC];
