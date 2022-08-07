import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { useAppState } from "../components/useApp";


function PageWrapper({ children }) {
  return <div class="container w-4/5 mx-auto">
    {children ?? null}
  </div>
}

export default function Home() {
  const { isLoggedIn } = useAppState().state;

  return (isLoggedIn ? <PageWrapper>
      <Dashboard />
    </PageWrapper> : <Login />
  )
}
