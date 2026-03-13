import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/auth/LoginPage'
import SignUpPage from './Pages/auth/SignUpPage'
import HomePage from './Pages/home/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App