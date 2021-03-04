import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './walletConnector.module.scss';
import { useWeb3State } from '../../ethereum/web3/Web3Context';

export const WalletConnector: FunctionComponent<unknown> = () => {
  const { activeAddress, initializeProvider } = useWeb3State();

  return (
    <div className={styles.wallet_connector} onClick={initializeProvider}>
      {activeAddress ? activeAddress : 'Connect Wallet'}
    </div>
  );
};
