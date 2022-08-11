import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Spinner } from '@chakra-ui/react'
import React from "react";


export default function Login() {
  const { connecting, publicKey } = useWallet();

  const msg = publicKey ? 'Fetching data...' : 'Connecting wallet...';

  let inProgress = connecting || publicKey;

  return (
    <div className={styles.container}>
      <Head>
        <title>Mato SDK</title>
        <meta name="description" content="Mato SDK dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {inProgress && (
      <>
        <Spinner  size='lg' color='green.400' />
        <p className='pt-2'>{msg}</p>
      </>
      )}

      {!inProgress && (
        <>
          <h1 className="text-3xl text-center">
            Connect your solana wallet to start
          </h1>

          <p className={styles.description}>
              <WalletMultiButton />
          </p>
        </>
      )}
      
        
      </main>

      <footer className={"fixed bottom-0 left-0 w-screen h-12 " + styles.footer}>
        Mato Labs
      </footer>

    </div>
  )
}
