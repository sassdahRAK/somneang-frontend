import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/auth/LoginPage'
import SignUpPage from './Pages/auth/SignUpPage'
import HomePage from './Pages/home/HomePage'
import SearchPage from './Pages/search/SearchPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App