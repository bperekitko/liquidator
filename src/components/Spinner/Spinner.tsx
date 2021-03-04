import React from 'react';
import styles from './spinner.module.scss';

interface SpinnerProps {
  size: number;
}
export function Spinner({ size }: SpinnerProps): JSX.Element {
  const sizeSyle = {
    width: size,
    height: size,
    borderWidth: `${Math.round(size / 10)}px`,
  };

  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner_dual_ring} style={sizeSyle}></div>
    </div>
  );
}
