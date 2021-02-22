import BN from 'bn.js';
import { toBN } from 'web3-utils';

export function formatBNToDecimal(value: BN, decimals: BN, precision: number): string {
  const denominator = toBN(10).pow(decimals);
  const wholePart = value.div(denominator).toString();
  const fractionalPart = formatFractional(value, decimals, precision);

  return `${wholePart}.${fractionalPart}`;
}

function formatFractional(amount: BN, decimals: BN, precision: number): string {
  const denominator = toBN(10).pow(decimals);
  const fractional = amount.mod(denominator).toString();
  const withZeros = fractional.padStart(decimals.toNumber(), '0');
  const withPrecision = withZeros.slice(0, precision);

  return withPrecision;
}
