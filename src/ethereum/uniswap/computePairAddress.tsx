import { Token } from '../arbitrage/Token';
import { soliditySha3, hexToBytes, bytesToHex } from 'web3-utils';

const UNISWAP_INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f';
const UNISWAP_V2_FACTORY_ADDRESS = '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f';

const SUSHISWAP_INIT_CODE_HASH = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303';
const SUSHISWAP_FACTORY_ADDRESS = '0xaDe0ad525430cfe17218B679483c46B6c1d63fe2';

const MAX_ADDRESS_BYTES_COUNT = 20; // address is uint160

export function computePairAddress(token0: Token, token1: Token): string {
  return computeAddress(token0, token1, UNISWAP_INIT_CODE_HASH, UNISWAP_V2_FACTORY_ADDRESS);
}

export function computeSushiswapPairAddress(token0: Token, token1: Token): string {
  return computeAddress(token0, token1, SUSHISWAP_INIT_CODE_HASH, SUSHISWAP_FACTORY_ADDRESS);
}

/**
 * Equivalent to Solidity code:
 *
 * address pair = address(uint(keccak256(abi.encodePacked(
 *        hex'ff',
 *        factory,
 *        keccak256(abi.encodePacked(token0, token1)),
 *        initCodeHash))))
 */
function computeAddress(token0: Token, token1: Token, initCodeHash: string, factoryAddress: string): string {
  const [address0, address1] = sorted(token0.address, token1.address);
  const pairHash = soliditySha3(address0, address1);
  const addresss = soliditySha3('0xff', factoryAddress, pairHash, initCodeHash);

  const bytes = hexToBytes(addresss);
  const truncated = bytes.slice(Math.max(bytes.length - MAX_ADDRESS_BYTES_COUNT, 0));

  return bytesToHex(truncated);
}

function sorted(address0: string, address1: string) {
  const result = [address0.toLocaleLowerCase(), address1.toLocaleLowerCase()];
  result.sort();
  return result;
}
