import './App.css'
import CallsAndPuts2 from './components/CallsAndPuts2/index'
import InvexAppBar from './components/InvexAppBar/InvexAppBar'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Graph from './components/Graph/Graph'
 
function App () {
  return (
    <Router>
      <div className='App'>
        <InvexAppBar />
        <Routes>
          <Route exact path='/' element={<CallsAndPuts2 />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
