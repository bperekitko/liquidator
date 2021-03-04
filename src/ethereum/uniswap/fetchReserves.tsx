import { Token } from '../arbitrage/Token';
import { Eth } from 'web3-eth';
import { computePairAddress } from './computePairAddress';
import UniswapV2PairAbi from './abi/UniswapV2Pair.json';

export async function fetchUniswapReserves(token0: Token, token1: Token, ethereum: Eth): Promise<string[]> {
  const address = computePairAddress(token0, token1);
  const pairContract = new ethereum.Contract(UniswapV2PairAbi, address);
  const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();
  return token0.address < token1.address ? [reserve0, reserve1] : [reserve1, reserve0];
}

export async function fetchSushiswapReserves(token0: Token, token1: Token, ethereum: Eth): Promise<string[]> {
  const address = computePairAddress(token0, token1);
  const pairContract = new ethereum.Contract(UniswapV2PairAbi, address);
  const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();
  return token0.address < token1.address ? [reserve0, reserve1] : [reserve1, reserve0];
}
