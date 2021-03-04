import React from 'react';
import styles from './blockInfo.module.scss';
import { Spinner } from '../Spinner/Spinner';
import { useWeb3State } from '../../ethereum/web3/Web3Context';

export function BlockInfo(): JSX.Element {
  const { lastBlock } = useWeb3State();

  return (
    <div className={styles.block_info}>
      <div className={styles.block_info_title}>Last block</div>
      {lastBlock ? (
        <>
          <span className={styles.block_info_field}>{`Hash: ${truncateHash(lastBlock.hash)}`}</span>
          <span className={styles.block_info_field}>{`Number: ${lastBlock.number}`}</span>
          <span className={styles.block_info_field}>{`At: ${asHumanReadbleDate(lastBlock?.date)}`}</span>
        </>
      ) : (
        <Spinner size={32} />
      )}
    </div>
  );
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(hash.length - 6)}`;
}

function asHumanReadbleDate(date: Date): string {
  const month = withZerosPadded(date.getMonth() + 1);
  const day = withZerosPadded(date.getDate());
  const hours = withZerosPadded(date.getHours());
  const minutes = withZerosPadded(date.getMinutes());
  const seconds = withZerosPadded(date.getSeconds());

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

function withZerosPadded(input: number): string {
  return (input + '').padStart(2, '0');
}
