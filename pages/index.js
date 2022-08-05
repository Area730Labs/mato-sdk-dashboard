import { useWallet } from "@solana/wallet-adapter-react";
import Login from '../components/login';
import Dashboard from '../components/dashboard';

export default function Home() {
  const { publicKey } = useWallet();

  return (
    publicKey != null ? <Dashboard /> : <Login/>
  )
}
