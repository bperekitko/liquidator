import React, { FunctionComponent } from 'react';
import styles from './walletConnector.module.scss';
import { useWeb3State } from '../../ethereum/web3/Web3Context';
import Web3 from 'web3';
import ERC20Abi from '../../ethereum/constants/abi/ERC20.json';
import BigNumber from 'bignumber.js';
import RouterAbi from '../../ethereum/uniswap/abi/UniswapV2Router02.json';
import { UNISWAP_V2_ROUTER_ADDRESS } from '../../ethereum/constants/contractsAddresses';
import BALAPI from '../../../artifacts/contracts/BalancerTest.sol/BalancerTest.json';

const ethereum = new Web3(window['ethereum']).eth;
export const WalletConnector: FunctionComponent<unknown> = () => {
	const { activeAddress, initializeProvider } = useWeb3State();

	const onSwapClick = async () => {
		const fAddr1 = `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`;
		const daiAddr = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
		const contract = new ethereum.Contract(RouterAbi, UNISWAP_V2_ROUTER_ADDRESS);
		const amountOutMin = new BigNumber(10).pow(18).multipliedBy(1000).toString();
		const deadline = new Date().getTime() + 100000;
		const swap = contract.methods.swapExactETHForTokens(amountOutMin, [fAddr1, daiAddr], activeAddress, deadline);

		swap
			.send({
				from: activeAddress,
				value: new BigNumber(10).pow(18).multipliedBy(1000).toString(),
			})
			.on('transactionHash', function (hash) {
				console.log(`Transaction HASH: ${hash}`);
			})
			.on('confirmation', function (confirmationNumber, receipt) {
				console.log('CONFIRMED!');
				console.log(confirmationNumber);
				console.log(receipt);
			})
			.on('receipt', function (receipt) {
				console.log('RECEIPT!');
				console.log(receipt);
			});
	};
	const onCheckClick = async () => {
		const daiAddr = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
		const DAI = new ethereum.Contract(ERC20Abi, daiAddr);
		const daiBalance = await DAI.methods.balanceOf(activeAddress).call();
		console.log(`DAI BALANCE IS: ${daiBalance}`);
	};

	const onDecodeClicked = async () => {
		const swaps = [
			[
				{
					pool: '0x0000000000000000000000000000000000000123',
					tokenIn: '0x0000000000000000000000000000000000000123',
					tokenOut: '0x0000000000000000000000000000000000000123',
					limitReturnAmount: '33',
					maxPrice: '22',
					swapAmount: '1',
				},
			],
		];
		const addressBAL = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
		const eth = new Web3(window['ethereum']);
		const contract = new eth.eth.Contract(BALAPI.abi, addressBAL);

		const bytes =
			'0x' +
			'0000000000000000000000000000000000000000000000000000000000000020' +
			'0000000000000000000000000000000000000000000000000000000000000001' +
			'0000000000000000000000000000000000000000000000000000000000000020' +
			'0000000000000000000000000000000000000000000000000000000000000001' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000001' +
			'0000000000000000000000000000000000000000000000000000000000000021' +
			'0000000000000000000000000000000000000000000000000000000000000016';
		const bytes2 =
			'0x' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000123' +
			'0000000000000000000000000000000000000000000000000000000000000001' +
			'0000000000000000000000000000000000000000000000000000000000000021' +
			'0000000000000000000000000000000000000000000000000000000000000016';

		const bytes3ONEDIMARR = '';
		const result = await contract.methods.printStruct(bytes).call();

		console.log(`result is:`);
		console.log(result);
	};

	return (
		<div className={styles.wallet_connector} onClick={initializeProvider}>
			{activeAddress ? activeAddress : 'Connect Wallet'}
			<button onClick={onSwapClick}>SWAP SOME ETH</button>
			<button onClick={onCheckClick}>CHECK DAI BALANCE</button>
			<button onClick={onDecodeClicked}>onDecodeClicked</button>
		</div>
	);
};
