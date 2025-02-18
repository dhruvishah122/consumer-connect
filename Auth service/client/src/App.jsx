import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import Login from './pages/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className='grid grid-cols-1 justify-content-center'>
  <div  className='flex items-center justify-center '>
 <Login/>
 </div>
 </div>
   </>
  )
}

export default App
