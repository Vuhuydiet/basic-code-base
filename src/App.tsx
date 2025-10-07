import "./App.css";
import { CountProvider } from "./contexts/countContext";
import Counter from "./components/Counter";

function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;
