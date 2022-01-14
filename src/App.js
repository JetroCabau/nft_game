import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";


function App() {
  const useDispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  console.table(blockchain);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://pickle.family"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
