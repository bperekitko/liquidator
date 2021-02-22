import { Token } from '../arbitrage/Token';
import { toBN } from 'web3-utils';
import { fetchReservesFor } from './fetchReservesFor';
import BN from 'bn.js';
import { formatBNToDecimal } from './formatBNtoDecimal';

const FRACTIONAL_PRECISION = 6;
const WITH_FEE_MULTIPLIER = toBN(997);
const WITHOUT_FEE_MULTIPLIER = toBN(1000);

export const getPriceFor = async (inputToken: Token, outputToken: Token): Promise<string> => {
  const [inputReserve, outputReserve] = await fetchReservesFor(inputToken, outputToken);
  return computAmountIn(toBN(inputToken.decimals), toBN(outputToken.decimals), toBN(inputReserve), toBN(outputReserve));
};

/**
 * Equivalent to getAmountIn() from UniswapV2Library.sol
 *
 * https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol
 *
 */
function computAmountIn(inDecimals: BN, outDecimals: BN, reserveIn: BN, reserveOut: BN): string {
  const amountOut = toBN(10).pow(inDecimals);
  const numerator = amountOut.mul(WITHOUT_FEE_MULTIPLIER).mul(reserveOut);
  const denominator = reserveIn.sub(amountOut).mul(WITH_FEE_MULTIPLIER);

  const price = numerator.div(denominator).add(toBN(1));

  return formatBNToDecimal(price, outDecimals, FRACTIONAL_PRECISION);
}

/**
 * Equivalent to getAmountOut() from UniswapV2Library.sol
 *
 * https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol
 *
 */
function computeAmountOut(inDecimals: BN, outDecimals: BN, reserveIn: BN, reserveOut: BN): string {
  const amountIn = toBN(10).pow(inDecimals).mul(WITH_FEE_MULTIPLIER);
  const numerator = amountIn.mul(reserveOut);
  const denominator = reserveIn.mul(WITHOUT_FEE_MULTIPLIER).add(amountIn);

  const price = numerator.div(denominator);
  return formatBNToDecimal(price, outDecimals, FRACTIONAL_PRECISION);
}
