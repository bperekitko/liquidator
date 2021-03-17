import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './dexLogo.module.scss';

export function DexLogo({ dexName }: { dexName: string }): JSX.Element {
	const [isLoadingLogo, setIsLoadingLogo] = useState(true);
	const LogoRef = useRef();

	useEffect(() => {
		const loadLogo = async () => {
			setIsLoadingLogo(true);
			LogoRef.current = (await import(`../../assets/images/${dexName.toLocaleLowerCase()}-logo.svg`)).default;
			setIsLoadingLogo(false);
		};

		loadLogo();
	}, [dexName]);
	return !isLoadingLogo && LogoRef.current ? <LogoRef.current className={styles.dex_logo} /> : <Spinner size={16} />;
}
