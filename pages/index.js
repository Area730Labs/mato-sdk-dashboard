import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { useAppContext } from "../core/appcontext";
import { PublicKey } from '@solana/web3.js';
import ProjectContextProvider from "../components/projectContext"

function PageWrapper({ children }) {

  const project_id = new PublicKey("AQg9Cr7YpapTeu9YmfVTz1Rh1NTDCVbwEidqhnNnHRMz");

  return <ProjectContextProvider project={project_id}>
    <div class="container w-4/5 mx-auto">
      {children ?? null}
    </div>
  </ProjectContextProvider>
}

export default function Home() {
  const { authorized } = useAppContext();

  return (authorized ? <PageWrapper>
    <Dashboard />
  </PageWrapper> : <Login />
  )
}
