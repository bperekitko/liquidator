import React from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import { getPriceOnSushiswap } from '../../ethereum/uniswap/getPrice';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

interface SushiswapPriceProps {
  amount: number;
  token0: Token;
  token1: Token;
}

export function SushiswapPrice({ amount, token0, token1 }: SushiswapPriceProps): JSX.Element {
  const { ethereum } = useWeb3State();

  const getPrice = (amt: number, t0: Token, t1: Token) => {
    return getPriceOnSushiswap(amt, t0, t1, ethereum);
  };

  return <DexPrice amount={amount} token0={token0} token1={token1} dexName={'Sushiswap'} getPrice={getPrice} />;
}
