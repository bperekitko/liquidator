import React, { useState } from 'react';
import styles from './dropdown.module.scss';
import SelectIcon from '../../assets/icons/search.svg';

export default function Dropdown(): JSX.Element {
  const [contentHidden, setContentHidden] = useState(true);

  const toggleContentVisibility = () => {
    setContentHidden((hidden) => !hidden);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdown_button} onClick={toggleContentVisibility}>
        This is Dropdown
      </button>
      <div className={`${styles.dropdown_content} ${contentHidden && styles.hidden}`}>
        <div>
          <SelectIcon></SelectIcon>
          <input placeholder='Search me mothafucka' className={styles.dropdown_content_search}></input>
        </div>
        <button className={styles.dropdown_option}>Option1</button>
        <button className={styles.dropdown_option}>Option2</button>
      </div>
    </div>
  );
}
