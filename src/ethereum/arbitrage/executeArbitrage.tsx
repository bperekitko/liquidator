import { computeUniswapPairAddress } from '../uniswap/computePairAddress';
import { ERC20 } from '../constants/ERC20';
import { useWeb3 } from '../web3/useWeb3';
import UniswapV2PairAbi from '../uniswap/abi/UniswapV2Pair.json';
import BigNumber from 'bignumber.js';

interface ArbitrageData {
	inputToken: ERC20;
	outputToken: ERC20;
	amount: number;
	arbitrageContractAddress: string;
	senderAddress: string;
	encodedData?: string;
}

export function executeArbitrage({
	inputToken,
	outputToken,
	amount,
	arbitrageContractAddress,
	senderAddress,
	encodedData,
}: ArbitrageData): void {
	const { web3Instance: web3 } = useWeb3();

	const amountToSwap = new BigNumber(amount).multipliedBy(10 ** inputToken.decimals);
	const amount0Out = inputToken.address < outputToken.address ? amountToSwap.toString() : '0';
	const amount1Out = inputToken.address > outputToken.address ? amountToSwap.toString() : '0';

	const data = encodedData || web3.eth.abi.encodeParameter('bytes', '0x1');

	const pairAddress = computeUniswapPairAddress(inputToken, outputToken);
	const pairContract = new web3.eth.Contract(UniswapV2PairAbi, pairAddress);

	const swap = pairContract.methods.swap(amount0Out, amount1Out, arbitrageContractAddress, data);

	swap.send({
		from: senderAddress,
		value: new BigNumber(0).toString(),
	});
}
