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

    useEffect(() => {
        dispatch({ type: 'update_pubkey', payload: publicKey });

        if (publicKey) {
            fetchAppState(publicKey);
        }
    }, [publicKey]);

    const value = {state: state, dispatch: dispatch, actions: actions}

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case 'logOut':
        console.log('logOut');

            return {
                ...state,
                publicKey: null,
                serverData: null,
                isLoggedIn: false,
            };
        case 'app_data_updated':
        console.log('app_data_updated');

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
        console.log('Action: limited_item_added');
        const newItem = action.payload;

        let s1 = {
            ...state,
        };

        s1.serverData.limited_items.push(newItem);

        return s1;
      default:
        throw new Error();
    }
}


const actions = {
    fetchAppState: async (pubkey) => async (dispatch) => {
      try {
        const { data } = await axios.get('get_mato_config/' + pubkey.toString());

        dispatch({ type: 'app_data_updated', payload: { data } });
      } catch (error) {
        if (error.cancelled) return;
        console.error(error);
      }
    },
    addNewLimitedItem: (pubkey, newItem) => async (dispatch) => {
        console.log("start: addNewLimitedItem: " + pubkey + ", - " + newItem);
        try {
            const { data } = await axios.post('mato_add_limited_item', {pubkey: pubkey, item: newItem});
            
            console.log("1111");
            dispatch({ type: 'limited_item_added', payload: { newItem } });
            console.log("2222");
        } catch (error) {
            if (error.cancelled) return;
            console.error(error);
        }
      },
};