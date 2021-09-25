import './App.css';
import Header from './components/header.js'
import Modules from './components/modules.js'
import ListView from './features/list-view/list-view.js'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Split from 'react-split'


function App(props) {
  let state = props.store.getState()

  return (
    <>
      <Header />

      <Split className="split">
     
        <div>   
          <Modules/>
        </div>

        <div>
          <ListView headers={state.headers} recs={state.recs} />
        </div>

      </Split>
    </>
  );
}

export default App;
