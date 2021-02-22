import { Token } from '../arbitrage/Token';
import { soliditySha3, hexToBytes, bytesToHex } from 'web3-utils';
import { UNISWAP_V2_FACTORY_ADDRESS } from './constants/contractsAddresses';

const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f';
const MAX_ADDRESS_BYTES_COUNT = 20; // address is uint160

/**
 * Equivalent to Solidity code:
 *
 * address factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
 *
 * address pair = address(uint(keccak256(abi.encodePacked(
 *        hex'ff',
 *        factory,
 *        keccak256(abi.encodePacked(token0, token1)),
 *        hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
 *
 */
export function computePairAddress(token0: Token, token1: Token): string {
  const [address0, address1] = sorted(token0.address, token1.address);
  const pairHash = soliditySha3(address0, address1);
  const addresss = soliditySha3('0xff', UNISWAP_V2_FACTORY_ADDRESS, pairHash, INIT_CODE_HASH);

  const bytes = hexToBytes(addresss);
  const truncated = bytes.slice(Math.max(bytes.length - MAX_ADDRESS_BYTES_COUNT, 0));

  return bytesToHex(truncated);
}

function sorted(address0: string, address1: string) {
  const result = [address0.toLocaleLowerCase(), address1.toLocaleLowerCase()];
  result.sort();
  return result;
}
