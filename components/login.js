import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mato SDK</title>
        <meta name="description" content="Mato SDK dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-3xl text-center">
          Please login<br/>👇
        </h1>

        <p className={styles.description}>
            <WalletMultiButton />
        </p>
      </main>

      <footer className={"fixed bottom-0 left-0 w-screen h-12 " + styles.footer}>
        Mato Labs
      </footer>

    </div>
  )
}
