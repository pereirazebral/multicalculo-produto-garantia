import logo from './logo.svg';
import { InputText } from 'primereact/inputtext';
import './App.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css'    //theme
// import 'primereact/resources/primereact.min.css'                    //core css
// import 'primeicons/primeicons.css'                                  //icons
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <InputText value={'banana'} onChange={(e) => console.log(e.target.value)} />

      </header>
    </div>
  );
}

export default App;
