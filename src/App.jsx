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
import { GoogleOAuthProvider } from '@react-oauth/google'
import AdminPage from './pages/AdminPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProvider>
      <GoogleOAuthProvider clientId='248395402149-5nhchesuceesvh81lfejdtuljrhdciid.apps.googleusercontent.com'>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/invest' element={<Invest/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/pay' element={<Pay/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
          </Routes>
        </Router>
      </GoogleOAuthProvider>

    </AppProvider>
    
  )
}

export default App
