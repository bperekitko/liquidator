import React from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import { getPriceOnUniswap } from '../../ethereum/uniswap/getPrice';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

interface UniswapPriceProps {
  amount: number;
  token0: Token;
  token1: Token;
}

export function UniswapPrice({ token0, token1, amount }: UniswapPriceProps): JSX.Element {
  const { ethereum } = useWeb3State();

  const getPrice = (amt: number, t0: Token, t1: Token) => {
    return getPriceOnUniswap(amt, t0, t1, ethereum);
  };

  return <DexPrice amount={amount} token0={token0} token1={token1} dexName={'Uniswap'} getPrice={getPrice} />;
}
