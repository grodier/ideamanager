import '../style.css';
import AppProvider from '../context';
import AppRoot from '../components/AppRoot';

function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}

export default App;
