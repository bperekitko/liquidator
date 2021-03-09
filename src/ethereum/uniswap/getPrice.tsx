import { Token } from '../arbitrage/Token';
import { fetchUniswapReserves } from './fetchReserves';
import { Eth } from 'web3-eth';
import BigNumber from 'bignumber.js';

const FRACTIONAL_PRECISION = 6;
const WITH_FEE_MULTIPLIER = 997;
const WITHOUT_FEE_MULTIPLIER = 1000;

export const getPriceOnUniswap = async (amount: number, input: Token, output: Token, eth: Eth): Promise<string> => {
  const [inputReserve, outputReserve] = await fetchUniswapReserves(input, output, eth);
  const amountOut = new BigNumber(amount).multipliedBy(10 ** input.decimals);
  const amountIn = computeAmountIn(amountOut, new BigNumber(inputReserve), new BigNumber(outputReserve));

  return amountIn
    .dividedBy(10 ** output.decimals)
    .dividedBy(amount)
    .decimalPlaces(FRACTIONAL_PRECISION)
    .toString();
};

export const getPriceOnSushiswap = async (amount: number, input: Token, output: Token, eth: Eth): Promise<string> => {
  const [inputReserve, outputReserve] = await fetchUniswapReserves(input, output, eth);
  const amountIn = new BigNumber(amount).multipliedBy(10 ** input.decimals);
  const amountOut = computeAmountOut(amountIn, new BigNumber(inputReserve), new BigNumber(outputReserve));

  return amountOut
    .dividedBy(10 ** output.decimals)
    .dividedBy(amount)
    .decimalPlaces(FRACTIONAL_PRECISION)
    .toString();
};

/**
 * Equivalent to getAmountIn() from UniswapV2Library.sol
 *
 * https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol
 *
 */
function computeAmountIn(amountOut: BigNumber, reserveIn: BigNumber, reserveOut: BigNumber): BigNumber {
  const numerator = amountOut.multipliedBy(WITHOUT_FEE_MULTIPLIER).multipliedBy(reserveOut);
  const denominator = reserveIn.minus(amountOut).multipliedBy(WITH_FEE_MULTIPLIER);

  return numerator.dividedBy(denominator).plus(1);
}

/**
 * Equivalent to getAmountOut() from UniswapV2Library.sol
 *
 * https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol
 *
 */
function computeAmountOut(amountIn: BigNumber, reserveIn: BigNumber, reserveOut: BigNumber): BigNumber {
  const numerator = amountIn.multipliedBy(WITH_FEE_MULTIPLIER).multipliedBy(reserveOut);
  const denominator = reserveIn.multipliedBy(WITHOUT_FEE_MULTIPLIER).plus(amountIn);
  return numerator.dividedBy(denominator);
}
