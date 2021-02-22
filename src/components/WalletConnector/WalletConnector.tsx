import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './walletConnector.module.scss';
import { onAccountsChanged, getActiveAddress } from '../../ethereum/web3/Ethereum';

const WalletConnector: FunctionComponent<unknown> = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    onAccountsChanged(async () => {
      const activeAddress = await getActiveAddress();
      setAddress(activeAddress);
    });
  }, []);

  const onConnectWalletClicked = async () => {
    const activeAddress = await getActiveAddress();
    setAddress(activeAddress);
  };

  return (
    <div className={styles.wallet_connector} onClick={onConnectWalletClicked}>
      {address ? address : 'Connect Wallet'}
    </div>
  );
};

export default WalletConnector;
