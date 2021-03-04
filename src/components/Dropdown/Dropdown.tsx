import React, { useEffect, useState } from 'react';
import styles from './dropdown.module.scss';
import SearchIcon from '../../assets/icons/search.svg';
import { useOutsideClickHandler } from '../../hooks/useOutsideClickHandler';

interface DropdownOption<T> {
  label: string;
  value: T;
}

export interface DropdownProps<T> {
  options: DropdownOption<T>[];
  onOptionSelected: (value: T) => void;
  emptyOptionLabel?: string;
}

export function Dropdown<T>(props: DropdownProps<T>): JSX.Element {
  const { options, onOptionSelected, emptyOptionLabel } = props;

  const [contentVisible, setContentVisible] = useState(false);
  const [selectedOptionLabel, setSelectedOptionLabel] = useState('Select');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [contentRef, dropdownRef] = useOutsideClickHandler<HTMLDivElement>(2, () => setContentVisible(false));

  const onOptionClicked = (option: DropdownOption<T>) => {
    setContentVisible(false);
    setSelectedOptionLabel(option.label);
    onOptionSelected(option.value);
  };

  useEffect(() => {
    const filteredOptions = filterOptionsBy(options, searchInput);
    const jsxDropdownOptions = createJsxDropdownOptions(filteredOptions, onOptionClicked);
    setDropdownOptions(jsxDropdownOptions);
  }, [searchInput]);

  useEffect(() => {
    if (emptyOptionLabel) {
      setSelectedOptionLabel(emptyOptionLabel);
    }
  }, [emptyOptionLabel]);

  return (
    <div className={styles.dropdown_container}>
      <div className={styles.dropdown} onClick={() => setContentVisible((visible) => !visible)} ref={dropdownRef}>
        <span className={styles.dropdown_label}>{selectedOptionLabel}</span>
        <span className={styles.dropdown_arrow} />
      </div>
      {contentVisible && (
        <div ref={contentRef} className={styles.dropdown_content} tabIndex={0}>
          <div className={styles.dropdown_content_search}>
            <SearchIcon className={styles.dropdown_content_search_icon}></SearchIcon>
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder='Search...'
              className={styles.dropdown_content_search_input}
            ></input>
          </div>
          <span className={styles.dropdown_content_search_border_bottom} />
          {dropdownOptions}
        </div>
      )}
    </div>
  );
}

function filterOptionsBy<T>(options: DropdownOption<T>[], value: string): DropdownOption<T>[] {
  return value ? options.filter((o) => o.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())) : options;
}

function createJsxDropdownOptions<T>(
  options: DropdownOption<T>[],
  onOptionClicked: (option: DropdownOption<T>) => void
): JSX.Element[] {
  return options.map((option, index) => (
    <span key={index} className={styles.dropdown_option} onClick={() => onOptionClicked(option)}>
      {option.label}
    </span>
  ));
}
