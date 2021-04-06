//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0;

import './UniswapV2Library.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Pair.sol';

abstract contract Arbitrageur {
	address public uniswapFactory;
	address public targetContract;
	address payable public owner;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	constructor(address _factory, address _targetContract) {
		owner = payable(msg.sender);
		uniswapFactory = _factory;
		targetContract = _targetContract;
	}

	function prepareArbitrageData(uint256 amount0, uint256 amount1)
		internal
		returns (
			uint256 amountToSwap,
			uint256 amountRequired,
			IERC20 tokenToSwap,
			IERC20 tokenReceived
		)
	{
		address token0 = IUniswapV2Pair(msg.sender).token0();
		address token1 = IUniswapV2Pair(msg.sender).token1();
		assert(msg.sender == UniswapV2Library.pairFor(uniswapFactory, token0, token1));
		assert(amount0 == 0 || amount1 == 0);

		amountToSwap = amount0 == 0 ? amount1 : amount0;
		tokenToSwap = IERC20(amount0 == 0 ? token1 : token0);
		tokenReceived = IERC20(amount0 == 0 ? token0 : token1);

		(uint256 reserveA, uint256 reserveB) = UniswapV2Library.getReserves(uniswapFactory, token0, token1);
		amountRequired = UniswapV2Library.getAmountIn(amountToSwap, reserveA, reserveB);

		tokenToSwap.approve(targetContract, amountToSwap);
	}

	function setTargetContract(address newTargetContract) public onlyOwner {
		targetContract = newTargetContract;
	}

	function setFactory(address newFactory) public onlyOwner {
		uniswapFactory = newFactory;
	}

	function setOwner(address payable newOwner) public onlyOwner {
		owner = newOwner;
	}

	function deleteContract() public onlyOwner {
		selfdestruct(owner);
	}
}
