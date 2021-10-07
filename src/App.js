import { useSelector, useDispatch } from 'react-redux'
import Split from 'react-split'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Header from './components/header'
import TheArea from './components/the-area'
import Modules from './components/modules'

// import ListView from './features/list-view/list-view'
// import {GetListViewReducer} from './features/list-view/slice'
// import {GetAppReducer} from './app/___slice'
// import {andone} from './features/list-view/slice'


function App() {
  // const listviewState = useSelector( GetListViewReducer )
  // const appState = useSelector( GetAppReducer )

  return (
    <>
      <Header />

      {/* {listviewState.value} / 
      {appState.focusPage}  */}

      <Split className="split">
     
        <div>   
          <Modules/>
        </div>

        <div>
          {/* <ListView headers={listviewState.headers} recs={listviewState.recs} /> */}
          <TheArea/>
        </div>

      </Split>
    </>
  );
}

export default App;
