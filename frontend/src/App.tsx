import { Routes, Route } from "react-router-dom"
import './App.css'

import SignUp from "./page/signUp"
import SignIn from "./page/singIn"
import IndonesiaMap from "./page/map"
import AddSitesPage from "./page/addPageSites"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/map" element={<IndonesiaMap />} />
      <Route path="/add-sites" element={<AddSitesPage />} />
    </Routes>
  )
}

export default App
