import { Token } from '../arbitrage/Token';
import { toBN } from 'web3-utils';
import { fetchUniswapReserves } from './fetchReserves';
import BN from 'bn.js';
import { formatBNToDecimal } from './formatBNtoDecimal';
import { Eth } from 'web3-eth';

const FRACTIONAL_PRECISION = 6;
const WITH_FEE_MULTIPLIER = toBN(997);
const WITHOUT_FEE_MULTIPLIER = toBN(1000);

export const getPriceOnUniswap = async (inputToken: Token, outputToken: Token, ethereum: Eth): Promise<string> => {
  const [inputReserve, outputReserve] = await fetchUniswapReserves(inputToken, outputToken, ethereum);
  return computeAmountIn(
    toBN(inputToken.decimals),
    toBN(outputToken.decimals),
    toBN(inputReserve),
    toBN(outputReserve)
  );
};

export const getPriceOnSushiswap = async (inputToken: Token, outputToken: Token, ethereum: Eth): Promise<string> => {
  const [inputReserve, outputReserve] = await fetchUniswapReserves(inputToken, outputToken, ethereum);
  return computeAmountOut(
    toBN(inputToken.decimals),
    toBN(outputToken.decimals),
    toBN(inputReserve),
    toBN(outputReserve)
  );
};

/**
 * Equivalent to getAmountIn() from UniswapV2Library.sol
 *
 * https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol
 *
 */
function computeAmountIn(inDecimals: BN, outDecimals: BN, reserveIn: BN, reserveOut: BN): string {
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
