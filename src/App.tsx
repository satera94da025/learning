import React from 'react';

import './App.css';
import ControlledInput from "./input";
import {DragCards} from "./dragAndDrop/card";

function App() {
  return (
    <div className="App">
     {/*<ControlledInput/>*/}
      <DragCards/>

    </div>
  );
}

export default App;
