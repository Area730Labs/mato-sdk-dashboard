import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Box, Flex, Link, Spinner, Text, Tooltip } from '@chakra-ui/react'
import React from "react";
import Lottie from 'react-lottie-player'
import animation from "../public/animation.json"
import { PlusSquareIcon, RepeatIcon } from '@chakra-ui/icons';
import { AuthorizeState, useAppContext } from '../core/appcontext';

function Stats(props) {

  const { label, value, children, ...rest } = props;

  return <Flex direction="row" alignItems="center" {...rest}>
    <Box
      fontSize="xl"
      fontWeight="bold"
    >
      {children}
    </Box>
    <Box paddingLeft="15px" textAlign="left" >
      <Box fontSize="sm" color="gray"  >{props.label}</Box>
      <Box fontSize="sm" fontWeight="bold">{parseInt(props.value).toLocaleString()}</Box>
    </Box>
  </Flex>
}

export default function Login() {

  const { connecting, publicKey } = useWallet();
  const {authorizeState,projects} = useAppContext();

  let msg = publicKey ? 'Sign a message in wallet to authorize' : 'Connecting wallet...';

  if (authorizeState == AuthorizeState.noproject) {
    msg = 'Confirm project creation to continue';
  } 

  let inProgress = authorizeState != AuthorizeState.rejected && (connecting || publicKey);

  const leftWitdth = { base: "100%", sm: "40%" };
  const rightWitdth = { base: "100%", sm: "60%" };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection="column"
        width={leftWitdth}
        backgroundColor={"rgb(243 244 246)"}
        textAlign="center"
        transition="all .2s ease"
      >
        <Text marginTop="25px" fontSize='xl' fontWeight="bold">MatoLabs SDK</Text>
        <Box textAlign="center" marginLeft="50px">
          <Lottie
            loop
            animationData={animation}
            play
            style={{ width: 400, height: 400 }}
          />
        </Box>
        <Text marginTop="-70px" fontWeight="bold" fontSize='sm'>Live stats (no)</Text>
        <Box
          position="relative"
          display="flex"
          width="300px"
          alignSelf="center"
          marginTop="15px"
          // boxShadow="sm"
          borderRadius="15px"
          backgroundColor="white"
          padding="10px"
        >
          <Stats marginLeft="10px" marginRight="15px" width="50%" label="Market trades" value="98735323">
            <RepeatIcon />
          </Stats>
          <Stats paddingLeft="20px" borderLeft="1px solid #efefef" width="50%" label="Sales" value="2393832">
            <PlusSquareIcon />
          </Stats>
        </Box>
        <Box
          alignSelf="flex-end"
          marginBottom="20px"
          marginTop="auto"
          padding="0"
          color="rgb(118 118 118)"
          fontSize="xs"
          paddingX="20px"
          >
          By pressing connect button you're agreeing with <Link href="#terms">Terms and conditions</Link>.
          Services provided on "AS IS" basis. All source code available on <Link>github</Link>. 2022. All rights reserved
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        width={rightWitdth}
        alignSelf="center"
      >
        <div className={styles.container}>
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
                <Text paddingTop="4">{msg}</Text>
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
