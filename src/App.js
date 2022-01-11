import './App.css'
import CallsAndPuts2 from './components/CallsAndPuts2/index'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
 
function App () {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<CallsAndPuts2 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
