'use client';

import {useCallback, useEffect, useRef} from 'react';

export function useDebounce<T extends unknown[]>(delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
      };
    }, []);

    return useCallback((callback: (...args: T) => void, ...args: T) => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => callback(...args), delay);
    }, [delay])
}