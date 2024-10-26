import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Login from '@pages/auth/Login'
import Forgot from '@pages/auth/Forgot'
function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/forgot" element={<Forgot />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App