import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CompanyList from "./pages/CompanyList"
import CompanyProfile from "./pages/ComapanyProfile"
import WriteReview from "./pages/WriteReview"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/company/:companyId" element={<CompanyProfile />} />
        <Route path="/company/:companyId/write-review" element={<WriteReview />} />
      </Routes>
    </Router>
  )
}

export default App
