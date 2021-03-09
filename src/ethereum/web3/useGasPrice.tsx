import { useEffect, useState } from 'react';

const GAS_API_URL = 'https://ethgasstation.info/api/ethgasAPI.json';

export const useGasPrice = (): number => {
  const [gasPrice, setGasPrice] = useState<number>(100);

  useEffect(() => {
    async function getGasPrice() {
      const gasPriceInGwei = await fetchGasPrice();
      setGasPrice(gasPriceInGwei);
    }

    const gasPollingInterval = setInterval(getGasPrice, 10000);

    return () => clearInterval(gasPollingInterval);
  }, []);

  return gasPrice;
};

async function fetchGasPrice(): Promise<number> {
  const response = await fetch(GAS_API_URL);
  if (response.ok) {
    const gasPriceInfo = await response.json();
    return gasPriceInfo.fastest / 10;
  }
}
