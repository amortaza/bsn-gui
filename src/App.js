import React from "react"
import { useSelector } from 'react-redux'

import { ListViewState } from './features/list-view/slice'

function App() {
  const listViewState = useSelector( ListViewState )

  return (
    <div>
        {/* <Counter /> */}
        D {listViewState.value}
    </div>
  );
}

export default App;
