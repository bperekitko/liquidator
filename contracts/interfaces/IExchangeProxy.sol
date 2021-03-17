//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.4;
pragma abicoder v2;

import './ITokenInterface.sol';
import '../balancer/BalancerSwapLibrary.sol';

interface IExchangeProxy {
	function multihopBatchSwapExactIn(
		BalancerSwapLibrary.Swap[][] memory swapSequences,
		TokenInterface tokenIn,
		TokenInterface tokenOut,
		uint256 totalAmountIn,
		uint256 minTotalAmountOut
	) external payable returns (uint256 totalAmountOut);
}
