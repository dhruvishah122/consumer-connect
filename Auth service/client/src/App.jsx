import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import CustomerSignup from './pages/CustomerSignup'
import CustomerLogin from './pages/CustomerLogin'
import OrgSignup from './pages/OrgSignup'
import OrgLogin from './pages/OrgLogin'
import BranchSignup from './pages/BranchSignup'
import LocSearch from './components/ui/LocSearch'
import BranchLogin from './pages/BranchLogin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Navbar */}
        <nav>
          <ul style={{ display: 'flex', gap: '10px' }}>
            <li><a href="/" style={{ textDecoration: 'none' }}>BranchLogin</a></li>
            <li><a href="/BranchSignup" style={{ textDecoration: 'none' }}>BranchSignup</a></li>
            <li><a href="/customerLogin" style={{ textDecoration: 'none' }}>customerLogin</a></li>
            <li><a href="/customerSignup" style={{ textDecoration: 'none' }}>customerSignup</a></li>
            <li><a href="/OrgLogin" style={{ textDecoration: 'none' }}>OrgLogin</a></li>
            <li><a href="/OrgSignup" style={{ textDecoration: 'none' }}>OrgSignup</a></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Only Home page will be shown for '/' */}
          <Route path="/" element={<BranchLogin />} />

          {/* Only About page will be shown for '/about' */}
          <Route path="/BranchSignup" element={<BranchSignup />} />

          {/* Only Contact page will be shown for '/contact' */}
          <Route path="/customerLogin" element={<CustomerLogin />} />
          <Route path="/OrgLogin" element={<OrgLogin />} />

          {/* Only About page will be shown for '/about' */}
          <Route path="/OrgSignup" element={<OrgSignup />} />

          {/* Only Contact page will be shown for '/contact' */}
          <Route path="/customerSignup" element={<CustomerSignup />} />
        </Routes>
      </div>
    </Router>
{/* <div className='grid grid-cols-1 justify-content-center'>
  <div  className='flex items-center justify-center '>
 <BranchLogin/>
 </div>
 </div> */}
   </>
  )
}

export default App;
