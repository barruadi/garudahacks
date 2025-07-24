import { Routes, Route } from "react-router-dom"
import './App.css'

import SignUp from "./page/signUp"
import SignIn from "./page/signIn"
import IndonesiaMap from "./page/map"
import AddSitesPage from "./page/addPageSites"
import SplashPage from "./page/splash"
import ListsPage from "./page/lists"

function App() {

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/map" element={<IndonesiaMap />} />
      <Route path="/add-sites" element={<AddSitesPage />} />
      <Route path="/lists" element={<ListsPage />} />
    </Routes>
  )
}

export default App
