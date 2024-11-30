import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import { windowTypes } from "./data/enums.ts";

function App() {


  return (
    <>
      <div id={"windowsBody"}>
        <div className="windows-map">
          <Window width={800} height={700} type={windowTypes.MAP} />
        </div>
        <div className="windows-list">
          <Window width={800} height={700} type={windowTypes.LIST} />
        </div>
        <div className="windows-report">
          <Window width={800} height={700} type={windowTypes.REPORT} />
        </div>
      </div>
      <Taskbar />
    </>
  )
}

export default App
