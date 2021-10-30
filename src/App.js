/* eslint-disable */

import Split from 'react-split'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {appMsg} from './app/slice'
import { selector as appSelector } from './app/slice'

import Header from './components/header'
import Modules from './components/modules'

import UrlFormView from './components/url-form-view'
import UrlListView from './components/url-list-view'

import About from './components/about'
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'

function App() {

  const appState = useSelector( appSelector )
  const dispatch = useDispatch()

  let alertComponent

    if (appState.alert.msg) {
        alertComponent = <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            style={{marginBottom:"1em"}}
            severity={appState.alert.type}>

            {appState.alert.msg}
        </Alert>

        let timeout = {'error': 60000, 'warning':'60000', 'info':30000, 'success':15000}[ appState.alert.type ]
        setTimeout(() => {
            appMsg('info','',dispatch)
        }, timeout);
    }

    return (
    <Router>

      <Header />

      <Split className="split" sizes={[20,80]}>
     
      <div>   
        <Modules/>
      </div>

      <div style={{padding:"1em"}}>

        {alertComponent}

        <Switch>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/table/:table/:id">
            <UrlFormView />
          </Route>

          <Route path="/table/:table">
            <UrlListView />
          </Route>

          <Route path="/">
            <div>Dress up and nowhere to go?</div>
          </Route>

        </Switch>

        </div>

      </Split>

    </Router>
  );
}

export default App;
