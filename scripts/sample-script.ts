import { ethers } from 'hardhat';
import { SUSHISWAP_V2_ROUTER_ADDRESS, UNISWAP_V2_FACTORY_ADDRESS } from '../src/ethereum/constants/contractsAddresses';

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log('Deploying SushiswapArbitrageur contract with the account:', deployer.address);

	const SushiswapArbitrageur = await ethers.getContractFactory('SushiswapArbitrageur');
	const arbitrageur = await SushiswapArbitrageur.deploy(UNISWAP_V2_FACTORY_ADDRESS, SUSHISWAP_V2_ROUTER_ADDRESS);

	console.log('SushiswapArbitrageur deployed at address:', arbitrageur.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
