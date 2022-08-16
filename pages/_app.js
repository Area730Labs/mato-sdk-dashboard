import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'

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

  return (
    <Box
      display="flex"
      // width="100%"
      minHeight="100%"
      alignItems="center"
      position="relative"
      height="100vh"
      marginY={"32px"}
    >
      <ChakraProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} >
            <WalletModalProvider>
              <AppProvider>
                <Container
                  padding={0}
                  overflow="hidden"
                  display={"flex"}
                  maxW='container.lg'
                  borderRadius="24px"
                  backgroundColor={"white"}
                  boxShadow="xl"
                  minH={"660px"}
                  alignContent="stretch"
                  style={{transition:"all 0.2 ease"}}
                >
                  <Component {...pageProps} />
                </Container>
              </AppProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        <ToastContainer position='bottom-right' />
      </ChakraProvider>
    </Box>
  );
}

export default App
