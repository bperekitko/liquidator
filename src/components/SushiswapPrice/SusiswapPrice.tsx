import React, { useEffect, useState } from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import { getPriceOnSushiswap } from '../../ethereum/uniswap/getPrice';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

interface UniswapPriceProps {
  token0: Token;
  token1: Token;
}

export function SusiswapPrice({ token0, token1 }: UniswapPriceProps): JSX.Element {
  const { ethereum } = useWeb3State();

  const getPrice = (token0: Token, token1: Token) => {
    return getPriceOnSushiswap(token0, token1, ethereum);
  };

  return <DexPrice token0={token0} token1={token1} dexName={'Sushiswap'} getPrice={getPrice} />;
}
