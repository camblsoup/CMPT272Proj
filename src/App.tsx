import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import { windowTypes } from "./data/enums.ts";
import { useState, useEffect } from 'react';
import { Report } from './data/reportType';

function App() {
  const [reports, setReports] = useState<Report[]>(() => {
    const savedReports = localStorage.getItem('reports');
    return savedReports ? JSON.parse(savedReports) : [];
  });
  const [activeWindow, setActiveWindow] = useState(0);
  const [currentReport, setCurrentReport] = useState(0);

  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  function updateReports(newReports: Report[]) {
    setReports(newReports);
  }

  function changeActiveWindow(index: number) {
    setActiveWindow(index);
  }

  function changeCurrentReport(reportId: number) {
    setCurrentReport(reportId);
  }

  return (
    <>
      <div id={"windowsBody"}>
        <div className="windows-map">
          <Window width={800} height={700} type={windowTypes.MAP} windowIndex={0} 
            activeIndex={activeWindow} changeActive={changeActiveWindow}
            currentReport={currentReport} changeCurrentReport={changeCurrentReport}
            reports={reports}
            updateReports={updateReports}/>
        </div>
        <div className="windows-list">
          <Window width={800} height={700} type={windowTypes.LIST} windowIndex={1} 
            activeIndex={activeWindow} changeActive={changeActiveWindow}
            currentReport={currentReport} changeCurrentReport={changeCurrentReport}
            reports={reports}
            updateReports={updateReports}/>
        </div>
        <div className="windows-report">
          <Window width={800} height={700} type={windowTypes.REPORT} windowIndex={2} 
            activeIndex={activeWindow} changeActive={changeActiveWindow}
            currentReport={currentReport} changeCurrentReport={changeCurrentReport}
            reports={reports}
            updateReports={updateReports}/>
        </div>
      </div>
      <Taskbar />
    </>
  )
}

export default App
