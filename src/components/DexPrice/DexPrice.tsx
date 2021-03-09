import React, { useEffect, useRef, useState } from 'react';
import { Token } from '../../ethereum/arbitrage/Token';
import styles from './dexPrice.module.scss';
import { Spinner } from '../Spinner/Spinner';

interface DexPriceProps {
  amount: number;
  token0: Token;
  token1: Token;
  dexName: string;
  getPrice: (amount: number, token0: Token, token1: Token) => Promise<string>;
}

export function DexPrice({ amount, token0, token1, dexName, getPrice }: DexPriceProps): JSX.Element {
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState(true);

  const LogoRef = useRef();
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      setPrice('');
      if (amount > 0 && token0 && token1 && token0.ticker !== token1.ticker) {
        setIsLoadingPrice(true);
        const fetchedPrice = await getPrice(amount, token0, token1);
        setPrice(fetchedPrice);
        setIsLoadingPrice(false);
      }
    };

    fetchPrice();

    const pricePollingInterval = setInterval(fetchPrice, 4000);

    return () => clearInterval(pricePollingInterval);
  }, [amount, token0, token1]);

  useEffect(() => {
    const loadLogo = async () => {
      setIsLoadingLogo(true);
      LogoRef.current = (await import(`../../assets/images/${dexName.toLocaleLowerCase()}-logo.svg`)).default;
      setIsLoadingLogo(false);
    };

    loadLogo();
  }, [dexName]);

  return (
    <div className={styles.dex_price_container}>
      <div className={styles.dex_header}>
        {!isLoadingLogo && LogoRef.current ? <LogoRef.current className={styles.dex_logo} /> : <Spinner size={16} />}
        <span className={styles.dex_name}>{dexName}</span>
      </div>
      {isLoadingPrice ? <Spinner size={40} /> : <span className={styles.dex_price}>{price}</span>}
    </div>
  );
}
