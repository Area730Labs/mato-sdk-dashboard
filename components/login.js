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

  const leftWitdth = {base: "100%", sm: "40%"};
  const rightWitdth = {base: "100%", sm: "60%"};


  return (
    <>
      <Box
        display={"flex"}
        flexDirection="column"
        width={leftWitdth}
        backgroundColor={"rgb(243 244 246)"}
        textAlign="center"
      >
        <Text marginTop="25px" fontSize='xl' fontWeight="bold">MatoLabs</Text>
        <Box textAlign="center" marginLeft="50px">
          <Lottie
            loop
            animationData={animation}
            play
            style={{ width: 400, height: 400 }}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        width={rightWitdth}
        alignSelf="center"
      >
        <div className={styles.container} alignSelf="stretch">
         {/* wrong place for this, no  */}
          <Head>
            <title>Mato SDK</title>
            <meta name="description" content="Mato SDK dashboard" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Box className={styles.main}>
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
                  <WalletMultiButton style={{ width: "100%" }} />
                </p>
              </>
            )}
          </Box>
        </div>
      </Box>
    </>
  )
}
