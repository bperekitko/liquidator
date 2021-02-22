import { Token } from '../arbitrage/Token';
import { computePairAddress } from './computePairAddress';
import { useEthConnector } from '../web3/Ethereum';
import UniswapV2PairAbi from './abi/UniswapV2Pair.json';

const ETHEREUM = useEthConnector();

export async function fetchReservesFor(token0: Token, token1: Token): Promise<string[]> {
  const address = computePairAddress(token0, token1);
  const pairContract = new ETHEREUM.Contract(UniswapV2PairAbi, address);
  const { reserve0, reserve1 } = await pairContract.methods.getReserves().call();
  return token0.address < token1.address ? [reserve0, reserve1] : [reserve1, reserve0];
}
