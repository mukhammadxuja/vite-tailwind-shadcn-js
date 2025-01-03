import './App.css';
import Dashboard from './pages/Dashboard';
import { FontProvider } from './context/FontContext';

function App() {
  return (
    <FontProvider>
      <Dashboard />
    </FontProvider>
  );
}

export default App;
