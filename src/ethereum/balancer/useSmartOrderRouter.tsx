import { BigNumber } from '@balancer-labs/sor/dist/utils/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { SOR } from '@balancer-labs/sor';
import { Token } from '../arbitrage/Token';

const POOLS_URL = `https://ipfs.fleek.co/ipns/balancer-team-bucket.storage.fleek.co/balancer-exchange/pools`;
const MAX_POOLS_HOPS = 4;
const PROVIDER = new Web3Provider(window['ethereum']);

const SMART_ORDER_ROUTER = new SOR(PROVIDER, undefined, MAX_POOLS_HOPS, undefined, POOLS_URL);
let initialized = false;

export interface SmartOrderRouter {
  updateGasPrice: (gasPriceInGwei: number) => void;
  updateChainId: (chainId: number) => void;
  getPrice: (amount: number, input: Token, output: Token) => Promise<string>;
}

export const useSmartOrderRouter = (): SmartOrderRouter => {
  return {
    updateGasPrice,
    updateChainId,
    getPrice,
  };
};

const updateGasPrice = (gasPriceInGwei: number) => {
  const gasPriceInWei = new BigNumber(gasPriceInGwei * 2).multipliedBy(10 ** 9);
  SMART_ORDER_ROUTER.gasPrice = gasPriceInWei;
};

const updateChainId = async (chainId: number) => {
  initialized = false;
  SMART_ORDER_ROUTER.chainId = chainId;
  await SMART_ORDER_ROUTER.fetchPools();
  initialized = true;
};

const getPrice = async (amount: number, input: Token, output: Token) => {
  const amountIn = new BigNumber(amount * 10 ** input.decimals);
  await isInitialized();
  await SMART_ORDER_ROUTER.setCostOutputToken(output.address);
  const [_, amountOut] = await SMART_ORDER_ROUTER.getSwaps(input.address, output.address, 'swapExactIn', amountIn);

  return amountOut
    .div(amount * 10 ** output.decimals)
    .decimalPlaces(6)
    .toString();
};

const isInitialized = () => {
  return new Promise<void>((resolve, _) => {
    const interval = setInterval(() => {
      if (initialized && SMART_ORDER_ROUTER.gasPrice) {
        resolve();
        clearInterval(interval);
      }
    }, 500);
  });
};
