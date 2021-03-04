import React from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import { getPriceOnBalancer } from '../../ethereum/balancer/getPriceOnBalancer';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

interface BalancerPriceProps {
  token0: Token;
  token1: Token;
}

export function BalancerPrice({ token0, token1 }: BalancerPriceProps): JSX.Element {
  const { chainId, gasPrice } = useWeb3State();
  const amount = 10;

  const getPrice = (inputToken: Token, outputToken: Token) => {
    return getPriceOnBalancer({
      amount,
      chainId,
      gasPrice,
      inputToken,
      outputToken,
    });
  };

  return <DexPrice token0={token0} token1={token1} dexName={'Balancer'} getPrice={getPrice}></DexPrice>;
}
