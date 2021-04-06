//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.4;
pragma abicoder v2;

import './BalancerSwapLibrary.sol';
import '../interfaces/ITokenInterface.sol';
import '../interfaces/IERC20.sol';
import '../interfaces/IUniswapV2Callee.sol';
import '../interfaces/IExchangeProxy.sol';
import '../Arbitrageur.sol';

contract BalancerArbitrageur is Arbitrageur, IUniswapV2Callee {
	constructor(address factory, address balancerExchangeProxy) Arbitrageur(factory, balancerExchangeProxy) {}

	function uniswapV2Call(
		address,
		uint256 amount0,
		uint256 amount1,
		bytes calldata encodedSwaps
	) external override {
		(uint256 amountIn, uint256 amountNeeded, IERC20 tokenIn, IERC20 tokenOut) = prepareArbitrageData(amount0, amount1);

		BalancerSwapLibrary.Swap[][] memory swaps = abi.decode(encodedSwaps, (BalancerSwapLibrary.Swap[][]));
		TokenInterface tokenToSwap = TokenInterface(address(tokenIn));
		TokenInterface tokenReceived = TokenInterface(address(tokenOut));

		IExchangeProxy proxy = IExchangeProxy(targetContract);
		uint256 amountReceived = proxy.multihopBatchSwapExactIn(swaps, tokenToSwap, tokenReceived, amountIn, amountNeeded);


		uint256 profit = amountReceived - amountNeeded;

		tokenReceived.transfer(msg.sender, amountNeeded);
		tokenReceived.transfer(owner, profit);
	}
}
