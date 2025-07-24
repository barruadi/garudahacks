import { Routes, Route } from "react-router-dom"
import './App.css'

import SignUp from "./page/signUp"
import SignIn from "./page/singin"


function App() {

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}

export default App
