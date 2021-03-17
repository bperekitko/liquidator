//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0;

import '../interfaces/IUniswapV2Router02.sol';
import '../interfaces/IUniswapV2Callee.sol';
import '../interfaces/IERC20.sol';
import '../Arbitrageur.sol';

contract SushiswapArbitrageur is Arbitrageur, IUniswapV2Callee {
	constructor(address factory, address sushiswapRouter) Arbitrageur(factory, sushiswapRouter) {}

	function uniswapV2Call(
		address,
		uint256 amount0,
		uint256 amount1,
		bytes calldata
	) external override {
		(uint256 amountIn, uint256 amountNeeded, IERC20 tokenIn, IERC20 tokenOut) = prepareArbitrageData(amount0, amount1);

		address[] memory path = new address[](2);
		path[0] = address(tokenIn);
		path[1] = address(tokenOut);

		uint256 deadline = block.timestamp + 2 hours;
		IUniswapV2Router02 router = IUniswapV2Router02(targetContract);

		uint256 amountReceived = router.swapExactTokensForTokens(amountIn, amountNeeded, path, address(this), deadline)[1];

		uint256 profit = amountReceived - amountNeeded;

		tokenOut.transfer(msg.sender, amountNeeded);
		tokenOut.transfer(owner, profit);
	}
}
