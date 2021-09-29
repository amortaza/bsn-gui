import './App.css';
import Header from './components/header.js'
import Modules from './components/modules.js'
import ListView from './features/list-view/list-view.js'
import {ListViewState} from './features/list-view/slice'

import Split from 'react-split'

import { useSelector, useDispatch } from 'react-redux'

function App() {
  const listviewState = useSelector( ListViewState )
  // const recs = useSelector((state)=> state.recs)
  // const headers = useSelector((state)=>state.headers)
  // const dispatch = useDispatch()

  console.log('******************************** hi');
  return (
    <>
      <Header />

      <Split className="split">
     
        <div>   
          <Modules/>
        </div>

        <div>
          <ListView headers={listviewState.headers} recs={listviewState.recs} />
        </div>

      </Split>
    </>
  );
}

export default App;
