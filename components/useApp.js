import { createContext, useContext, useMemo, useState, useReducer, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr'
import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/'
const API_URL = 'https://dev-api.soltracker.io/';

axios.defaults.baseURL = API_URL;


const DEFAULT_STATE = {
    isLoggedIn: false,
    publicKey: null,
    serverData: null,
    
};


export const AppContext = createContext({state: {}, dispatch: () => {}, actions: {}});

export function useAppState() {
    return useContext(AppContext);
}

export function AppStateProvider({children}) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const {publicKey} = useWallet(); 

    const fetchAppState = async (pubkey) => {
        try {
          const { data } = await axios.get('get_mato_config/' + pubkey.toString());
          dispatch({ type: 'app_data_updated', payload: { data } });
        } catch (error) {
          if (error.cancelled) return;
          console.error(error);
        }
    };

    const addNewLimitedItemAction = async (pubkey, newItem) => {
        try {
            const { data } = await axios.post('mato_add_limited_item', {pubkey: pubkey, item: newItem});
            const items = state.serverData.limited_items.concat(newItem);

            dispatch({ type: 'limited_item_added', payload: { items: items} });
        } catch (error) {
            if (error.cancelled) return;
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch({ type: 'update_pubkey', payload: publicKey });

        if (publicKey) {
            fetchAppState(publicKey);
        }
    }, [publicKey]);

    const value = {state: state, dispatch: dispatch, actions: {
        addNewLimitedItem: addNewLimitedItemAction
    }}

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case 'logOut':
            return {
                ...state,
                publicKey: null,
                serverData: null,
                isLoggedIn: false,
            };
        case 'app_data_updated':
            const data = action.payload.data;
            return {
                ...state,
                serverData: data,
                isLoggedIn: state.publicKey != null && data != null
            };
        case 'update_pubkey':
            const pk = action.payload;

            return {
                ...state,
                publicKey: pk,
                isLoggedIn: pk != null && state.serverData != null
            };

        case 'limited_item_added':
            const items = action.payload.items;

            let s1 = {...state,};
            s1.serverData.limited_items = items;

            return s1;
      default:
        throw new Error();
    }
}
