import { useSelector, useDispatch } from 'react-redux'
import Split from 'react-split'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Header from './components/header'
import Modules from './components/modules'

import ListView from './features/list-view/list-view'
import {GetListViewReducer} from './features/list-view/slice'
import {GetAppReducer} from './app/slice'
import {andone} from './features/list-view/slice'


function App() {
  const listviewState = useSelector( GetListViewReducer )
  const appState = useSelector( GetAppReducer )

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
          <ListView headers={listviewState.headers} recs={listviewState.recs} />
        </div>

      </Split>
    </>
  );
}

export default App;
