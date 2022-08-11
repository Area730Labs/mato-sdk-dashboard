import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { useAppContext } from "../core/appcontext";

function PageWrapper({ children }) {

  return <div class="container w-4/5 mx-auto">
      {children ?? null}
    </div>
}

export default function Home() {
  const { authorized } = useAppContext();

  return (authorized ? <PageWrapper>
    <Dashboard />
  </PageWrapper> : <Login />
  )
}
