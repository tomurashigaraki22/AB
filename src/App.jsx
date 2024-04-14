import { useState } from 'react'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { AppProvider } from '../context'
import Home from './components/Home'
import Invest from './components/Invest'
import Dashboard from './pages/Dashboard'
import Pay from './components/Pay'
import Profile from './components/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/invest' element={<Invest/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/pay' element={<Pay/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </AppProvider>
    
  )
}

export default App
