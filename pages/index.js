import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { AppProvider } from "../core/appcontext";
import { useWallet } from '@solana/wallet-adapter-react';

function PageWrapper({ children }) {

  let {wallet} = useWallet();

  return <AppProvider wallet={wallet.adapter}>
    <div class="container w-4/5 mx-auto">
      {children ?? null}
    </div>
  </AppProvider>
}

export default function Home() {
  const { isLoggedIn } = true;

  return (isLoggedIn ? <PageWrapper>
    <Dashboard />
  </PageWrapper> : <Login />
  )
}
