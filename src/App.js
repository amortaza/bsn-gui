/* eslint-disable */

import Split from 'react-split'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Header from './components/header'
import TheArea from './components/the-area'
import Modules from './components/modules'

function App() {

  return (
    <>

      <Header />

      <Split className="split" sizes={[20,80]}>
     
        <div>   
          <Modules/>
        </div>

        <div>
          <TheArea/>
        </div>

      </Split>
    </>
  );
}

export default App;
