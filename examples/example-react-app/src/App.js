import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p data-testid='paragraph'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="anchor"
        >
          Learn React
        </a>
        <input
          placeholder={"hello"}
          data-testid="thisInput"
        ></input>
      </header>
    </div>
  );
}

export default App;
