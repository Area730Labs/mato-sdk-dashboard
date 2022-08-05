import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {useMemo} from 'react'

require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css'

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
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <Component {...pageProps} />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);
}

export default App
