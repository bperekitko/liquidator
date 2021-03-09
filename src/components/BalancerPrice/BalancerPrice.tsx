import React, { useEffect } from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import { useSmartOrderRouter } from '../../ethereum/balancer/useSmartOrderRouter';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import { DexPrice } from '../DexPrice/DexPrice';

interface BalancerPriceProps {
  amount: number;
  token0: Token;
  token1: Token;
}

export function BalancerPrice({ amount, token0, token1 }: BalancerPriceProps): JSX.Element {
  const { gasPriceInGwei, chainId } = useWeb3State();
  const sor = useSmartOrderRouter();

  const getPrice = (amt: number, inputToken: Token, outputToken: Token) => sor.getPrice(amt, inputToken, outputToken);

  useEffect(() => {
    sor.updateGasPrice(gasPriceInGwei);
  }, [gasPriceInGwei]);

  useEffect(() => {
    if (chainId) {
      sor.updateChainId(chainId);
    }
  }, [chainId]);

  return <DexPrice amount={amount} token0={token0} token1={token1} dexName={'Balancer'} getPrice={getPrice}></DexPrice>;
}
