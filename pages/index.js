import { useWallet } from "@solana/wallet-adapter-react";
import Login from '../components/login';
import Dashboard from '../components/dashboard';


function PageWrapper({ children }) {
  return <div class="container w-4/5 mx-auto">
    {children ?? null}
  </div>
}

export default function Home() {
  const { publicKey } = useWallet();

  return (
    publicKey != null ? <PageWrapper>
      <Dashboard />
    </PageWrapper> : <Login />
  )
}
