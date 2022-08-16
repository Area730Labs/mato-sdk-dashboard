import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { useAppContext } from "../core/appcontext";
import { PublicKey } from '@solana/web3.js';
import ProjectContextProvider, { ACTIVE_PROJECT_KEY, getActiveProject } from "../components/projectContext"


function PageWrapper({ children }) {

  const {wallet} = useAppContext();

  const project_id = wallet != null ? getActiveProject(wallet.publicKey) : null;

  return <ProjectContextProvider project={project_id}>
      {children ?? null}
  </ProjectContextProvider>
}

export default function Home() {
  const { authorized } = useAppContext();

  return (authorized ? <PageWrapper>
    <Dashboard alignContent="stretch" />
  </PageWrapper> : <Login />
  )
}
