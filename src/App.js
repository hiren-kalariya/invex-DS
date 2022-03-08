import './App.css'
import CallsAndPuts2 from './components/CallsAndPuts2/index'
import InvexAppBar from './components/InvexAppBar/InvexAppBar'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Graph from './components/Graph/Graph'
import TableGraph from './components/TableGraph/TableGraph'
import PredictData from './components/PredictData/PredictData'
 
function App () {
  return (
    <Router>
      <div className='App'>
        <InvexAppBar />
        <Routes>
          <Route exact path='/' element={<CallsAndPuts2 />} />
          <Route path="/graph" element={<TableGraph />} />
          <Route path="/comp-graph" element={<Graph />} />
          <Route path="/predict-data" element={<PredictData />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
