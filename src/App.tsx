import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import { windowTypes } from "./data/enums.ts";
import { useState } from 'react';

function App() {
  const [activeWindow, setActiveWindow] = useState(0);

  function changeActiveWindow(index: number) {
    setActiveWindow(index);
  }

  return (
    <>
      <div id={"windowsBody"}>
        <div className="windows-map">
          <Window width={800} height={700} type={windowTypes.MAP} windowIndex={0} activeIndex={activeWindow} changeActive={changeActiveWindow}/>
        </div>
        <div className="windows-list">
          <Window width={800} height={700} type={windowTypes.LIST} windowIndex={1} activeIndex={activeWindow} changeActive={changeActiveWindow}/>
        </div>
        <div className="windows-report">
          <Window width={800} height={700} type={windowTypes.REPORT} windowIndex={2} activeIndex={activeWindow} changeActive={changeActiveWindow}/>
        </div>
      </div>
      <Taskbar />
    </>
  )
}

export default App
