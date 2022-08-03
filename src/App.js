/* eslint-disable */

import Split from 'react-split'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import {appMsg} from './app/slice'
import { selector as appSelector } from './app/slice'

import Header from './components/header'
import Modules from './components/modules'

import UrlFormView from './components/url-form-view'
import UrlListView from './components/url-list-view'


import About from './components/about'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import UrlDictionaryView from './components/url-dictionary-view'
import UrlDictionaryForm from './components/url-dictionary-form'

function App() {
  

  const appState = useSelector( appSelector )
  const dispatch = useDispatch()

  let alertComponent = <Alert 
            icon={<CheckIcon fontSize="inherit" />} 
            style={{marginBottom:"1em", visibility: !!appState.alert.msg ? 'visible': 'hidden'}}
            severity={appState.alert.type}>

            {appState.alert.msg ? appState.alert.msg : 'Created Place Holder'}
            
        </Alert>

    if (appState.alert.msg) {
        let timeout = {'error': 10000, 'warning':'10000', 'info':5000, 'success':5000}[ appState.alert.type ]
        setTimeout(() => {
            appMsg('info','',dispatch)
        }, timeout);
    }

    return (
    <Router>

      <Header />

      <Switch>
        <Route path="/login">
        <About />
        </Route>
      </Switch>

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

          <Route path="/schema/new">
            <UrlDictionaryForm action="new" />
          </Route>

          <Route path="/schema/:table">
            <UrlDictionaryForm action="update" />
          </Route>

          <Route path="/schema">
            <UrlDictionaryView />
          </Route>

          <Route path="/table/:table/:id">
            <UrlFormView />
          </Route>

          <Route path="/table/:table">
            <UrlListView />
          </Route>

          <Route path="/">
            <div>Dressed up and nowhere to go?</div>
          </Route>

        </Switch>

        </div>

      </Split>

    </Router>
  );
}

export default App;
