//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0;

interface TokenInterface {
	function balanceOf(address) external view returns (uint256);

	function allowance(address, address) external view returns (uint256);

	function approve(address, uint256) external returns (bool);

	function transfer(address, uint256) external returns (bool);

	function transferFrom(
		address,
		address,
		uint256
	) external returns (bool);

	function deposit() external payable;

	function withdraw(uint256) external;
}
