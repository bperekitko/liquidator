import { useState } from 'react';

export const useGasPrice = (): number => {
  const [gasPrice, setGasPrice] = useState<number>(100);

  // TODO implement getting current gas price
  return gasPrice;
};
