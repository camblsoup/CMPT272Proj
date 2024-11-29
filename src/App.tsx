import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import {windowTypes} from "./data/enums.ts";

function App() {


  return (
    <>
        <div id={"windowsBody"}>
            <Window width={800} height={700} type={windowTypes.MAP}/>
        </div>
        <Taskbar />
    </>
  )
}

export default App
