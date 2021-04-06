import { ethers } from 'hardhat';
import {
	BALANCER_EXCCHANGE_PROXY_ADDRESS,
	UNISWAP_V2_FACTORY_ADDRESS,
} from '../src/ethereum/constants/contractsAddresses';

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log('Deploying BalancerArbitrageur contract with the account:', deployer.address);

	const BalancerArbitrageur = await ethers.getContractFactory('BalancerArbitrageur');
	const arbitrageur = await BalancerArbitrageur.deploy(UNISWAP_V2_FACTORY_ADDRESS, BALANCER_EXCCHANGE_PROXY_ADDRESS);

	console.log('BalancerArbitrageur deployed at address:', arbitrageur.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
