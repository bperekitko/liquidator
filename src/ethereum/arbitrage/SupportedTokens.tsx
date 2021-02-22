import { Token } from './Token';

const DAI: Token = {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  ticker: 'DAI',
  decimals: 18,
};

const WETH: Token = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ticker: 'WETH',
  decimals: 18,
};

const USDC: Token = {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  ticker: 'USDC',
  decimals: 6,
};

const WBTC: Token = {
  address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  ticker: 'WBTC',
  decimals: 8,
};

export const tokens: Token[] = [DAI, WETH, USDC, WBTC];
