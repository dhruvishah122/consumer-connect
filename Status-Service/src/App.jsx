import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserTable from './pages/DboardStat'
import DashboardTable from './pages/DboardStat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DashboardTable />
    </>
  )
}

export default App
