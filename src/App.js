/* eslint-disable */

import Split from 'react-split'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/header'
import Modules from './components/modules'

import UrlFormView from './components/url-form-view'
import UrlListView from './components/url-list-view'

import About from './components/about'
import TheArea from './components/the-area'

function App() {

  return (
    <Router>

      <Header />

      <Split className="split" sizes={[20,80]}>
     
      <div>   
        <Modules/>
      </div>

      <div style={{padding:"1em"}}>

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
            <TheArea/>
          </Route>

        </Switch>

        </div>

      </Split>

    </Router>
  );
}

export default App;
