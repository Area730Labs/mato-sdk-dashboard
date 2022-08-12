import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {useMemo} from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import '@solana/wallet-adapter-react-ui/styles.css';
import '../styles/globals.css'
import { AppProvider } from '../core/appcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          new SolflareWalletAdapter(),
          new PhantomWalletAdapter(),
      ],
      []
  );

  return(
      <ChakraProvider>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} >
                <WalletModalProvider>
                  <AppProvider>
                      <Component {...pageProps} />
                  </AppProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        <ToastContainer position='bottom-right' />
      </ChakraProvider>
  );
}

export default App
