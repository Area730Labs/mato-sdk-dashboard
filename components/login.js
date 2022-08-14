import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React from "react";
import Lottie from 'react-lottie-player'
import animation from "../public/animation.json"

export default function Login() {

  const { connecting, publicKey } = useWallet();
  const msg = publicKey ? 'Fetching data...' : 'Connecting wallet...';

  let inProgress = connecting || publicKey;

  return (
    <>
      <Box
        display={"flex"}
        flexDirection="column"
        width="50%"
        height={"100%"}
        backgroundColor={"rgb(243 244 246)"}
        textAlign="center"
      >
        <Text marginTop="25px" fontSize='xl' fontWeight="bold">MatoLabs</Text>
        <Box textAlign="center" marginLeft="20px">
          <Lottie
            loop
            animationData={animation}
            play
            style={{ width: 500, height: 500 }}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        width="50%"
      >
        <div className={styles.container}>
          <Head>
            <title>Mato SDK</title>
            <meta name="description" content="Mato SDK dashboard" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            {inProgress && (
              <>
                <Spinner size='lg' color='green.400' />
                <p className='pt-2'>{msg}</p>
              </>
            )}

            {!inProgress && (
              <>
                <Text textAlign="center">
                  Connect your solana wallet to start
                </Text>
                <p className={styles.description}>
                  <WalletMultiButton style={{ color: "black" }} />
                </p>
              </>
            )}
          </main>
        </div>
      </Box>
    </>
  )
}
