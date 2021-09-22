import './App.css';
import Header from './components/header.js'
import Modules from './components/modules.js'
// import Example from './components/example.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert } from 'react-bootstrap'

import Split from 'react-split'

function App() {
  return (
    <>
      <Header />

      <Split className="split">
     
        <div>   
          <Modules/>
        </div>

        <div>
          Hello BSN2!
        </div>

      </Split>
    </>
  );
}

export default App;
