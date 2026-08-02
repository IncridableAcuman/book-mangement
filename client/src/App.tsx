import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/landing" element={<Landing/>} />
    </Routes>
    </>
  )
}

export default App