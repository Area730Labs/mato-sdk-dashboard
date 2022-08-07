import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {useMemo} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css'
import { AppStateProvider } from '../components/useApp';





function App({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          new SolflareWalletAdapter(),
          // new PhantomWalletAdapter()
      ],
      []
  );

  return(
    
      <ChakraProvider>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} >
                <WalletModalProvider>
                  <AppStateProvider>
                    <Component {...pageProps} />
                  </AppStateProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
      </ChakraProvider>
    
  );
}

export default App
