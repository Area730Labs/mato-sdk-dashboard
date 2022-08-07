import { createContext, useContext, useMemo, useState, useReducer, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import useSWR from 'swr'
import axios from 'axios';
import {
    Keypair, 
    Signer, 
    Transaction, 
    SystemProgram,
    sendAndConfirmTransaction,
    Connection,
    Blockhash
} from '@solana/web3.js';
import {
    TOKEN_PROGRAM_ID, 
    Token, 
    getMinimumBalanceForRentExemptMint, 
    MINT_SIZE, 
    createInitializeMintInstruction
} from '@solana/spl-token';



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
    const {publicKey, wallet, sendTransaction, signMessage, signTransaction} = useWallet(); 
    // const { connection } = useConnection();

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
            const keypair = Keypair.generate();
            newItem.mint = keypair.publicKey.toString();

            const connection = new Connection("https://api.mainnet-beta.solana.com");
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const blockhash = (await connection.getLatestBlockhash()).blockhash;

            let ix_1 = SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports: lamports,
                programId: TOKEN_PROGRAM_ID,
            });


            const transaction = new Transaction().add(
                ix_1,
                createInitializeMintInstruction(keypair.publicKey, 6, publicKey, null, TOKEN_PROGRAM_ID)
            );

            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;
            transaction.sign(keypair);


            const sig = await sendTransaction(transaction, connection);

            const { data } = await axios.post('mato_add_limited_item', {pubkey: pubkey, item: newItem});
            const items = state.serverData.limited_items.concat(newItem);

            dispatch({ type: 'limited_item_added', payload: { items: items} });

            return true;
        } catch (error) {
            if (error.cancelled) return;
            console.error(error);
            return false;
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
