import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

export default {
	solidity: {
		compilers: [
			{
				version: '0.7.3',
			},
		],
		overrides: {
			'contracts/balancer/BalancerArbitrageur.sol': {
				version: '0.8.0',
			},
			'contracts/interfaces/IExchangeProxy.sol': {
				version: '0.8.0',
				settings: {},
			},
		},
	},
};
