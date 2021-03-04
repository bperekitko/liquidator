import { Token } from '../arbitrage/Token';
import { SOR } from '@balancer-labs/sor';
import { BigNumber } from '@balancer-labs/sor/dist/utils/bignumber';
import { Web3Provider } from '@ethersproject/providers';

const POOLS_URL = `https://ipfs.fleek.co/ipns/balancer-team-bucket.storage.fleek.co/balancer-exchange/pools`;
const MAX_POOLS_HOPS = 4;
const SWAP_TYPE = 'swapExactIn';

interface BalancerPriceInputData {
  amount: number;
  gasPrice: number;
  chainId: number;
  inputToken: Token;
  outputToken: Token;
}

export async function getPriceOnBalancer(data: BalancerPriceInputData): Promise<string> {
  const { amount, gasPrice, chainId, inputToken, outputToken } = data;
  const gasPriceInWei = new BigNumber(gasPrice).multipliedBy(10 ** 9);
  const provider = new Web3Provider(window['ethereum']);
  const amountIn = new BigNumber(amount * 10 ** inputToken.decimals);
  const sor = new SOR(provider, gasPriceInWei, MAX_POOLS_HOPS, chainId, POOLS_URL);

  await sor.fetchPools();
  await sor.setCostOutputToken(outputToken.address);

  const [_, amountOut] = await sor.getSwaps(inputToken.address, outputToken.address, SWAP_TYPE, amountIn);
  return amountOut
    .div(amount * 10 ** outputToken.decimals)
    .decimalPlaces(6)
    .toString();
}
