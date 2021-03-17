//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0;

library BalancerSwapLibrary {
	struct Swap {
		address pool;
		address tokenIn;
		address tokenOut;
		uint256 swapAmount;
		uint256 limitReturnAmount;
		uint256 maxPrice;
	}
}
