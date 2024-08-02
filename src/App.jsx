import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Register from './components/register'
import Login from './components/login'
import Error from "./components/error"
import Home from './components/home'

function App() {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    } else {
      navigate('/login')
    }
  }, [])

  function Protected({ auts, children }) {
    if (!auts) {
      return
      
    }
    return children
  }

  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={
        <Protected auts={token ? true : false}>
          <Home />
        </Protected>
      } />
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default App
