import React, { useEffect, useState } from 'react';
import styles from './numericInput.module.scss';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const valueChanged$ = new Subject<number>();

export function NumericInput({ valueChangedCallback }: { valueChangedCallback: (value: number) => void }): JSX.Element {
  const [value, setValue] = useState('');
  const positiveFloatingNumberRegex = /^\d*(?:[.])?\d*$/g;

  const onValueChanged = (newValue: string) => {
    if (positiveFloatingNumberRegex.test(newValue)) {
      valueChanged$.next(+newValue);
      setValue(newValue);
    }
  };

  useEffect(() => {
    const subscription = valueChanged$.pipe(debounceTime(500)).subscribe((v) => valueChangedCallback(v));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <input
      className={styles.numeric_input}
      placeholder='Amount...'
      value={value}
      onChange={(event) => onValueChanged(event.target.value)}
    ></input>
  );
}
