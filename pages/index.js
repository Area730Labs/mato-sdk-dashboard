import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { useAppState } from "../components/useApp";

export default function Home() {
  const { isLoggedIn } = useAppState().state;

  return (
    isLoggedIn ? <Dashboard /> : <Login/>
  )
}
