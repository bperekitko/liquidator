import { MutableRefObject, useEffect, useRef } from 'react';

export function useOutsideClickHandler<T>(refsCount: number, clickHandler: () => void): MutableRefObject<T>[] {
  const refs = [];
  for (let i = 0; i < refsCount; i++) {
    refs.push(useRef<T>(null));
  }

  const handleClickOutside = (event: MouseEvent) => {
    const isClickOutsideRefs = refs.every((r) => r.current && !r.current.contains(event.target));
    if (isClickOutsideRefs) {
      clickHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs]);

  return refs;
}
