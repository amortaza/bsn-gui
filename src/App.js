import './App.css';
import Header from './components/header.js'
import Modules from './components/modules.js'
import ListView from './list-view/list-view.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import Split from 'react-split'

function App() {

  let recs = [
    {Table: "User", Field: "First Name", Type: "String" },
    {Table: "User", Field: "Last Name", Type: "String" },
    {Table: "User", Field: "Phone", Type: "String" },
    {Table: "User", Field: "Active", Type: "True/False" },
  ];

  let headers = ['Table', 'Field', 'Type'];

  return (
    <>
      <Header />

      <Split className="split">
     
        <div>   
          <Modules/>
        </div>

        <div>
          <ListView headers={headers} recs={recs} />
        </div>

      </Split>
    </>
  );
}

export default App;
