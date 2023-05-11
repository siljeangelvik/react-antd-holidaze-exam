import { useState } from 'react';

function useLocalStorage(initialState) {
    const [state, setState] = useState(() => {
        try {
            const storedData = localStorage.getItem('userData');
            return storedData ? JSON.parse(storedData) : initialState;
        } catch (error) {
            console.error(error);
            return initialState;
        }
    });

    const setLocalStorage = (key, value) => {
        try {
            const newState = { ...state, [key]: value };
            localStorage.setItem('userData', JSON.stringify(newState));
            setState(newState);
        } catch (error) {
            console.error(error);
        }
    };

    const getLocalStorage = (key) => {
        return state[key];
    };

    return { setLocalStorage, getLocalStorage };
}

export default useLocalStorage;
