'use client';

import {useCallback, useEffect, useRef} from 'react';

// Returns a debounced version of the given function. The debounced function
// delays invoking the function until after "delay" milliseconds have elapsed
// since the last time it was invoked.
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Clear any pending timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Return stable debounced function
    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }, [fn, delay]);
}