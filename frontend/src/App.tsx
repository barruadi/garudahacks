import { Routes, Route } from "react-router-dom"
import './App.css'

import SignUp from "./page/signUp"
import SignIn from "./page/signIn"
import IndonesiaMap from "./page/map"
import AddSitesPage from "./page/addPageSites"
import AddLocalProductPage from "./page/addLocalProductPage"
import SplashPage from "./page/splash"
import ListsPage from "./page/lists"
import LocalProductPage from "./page/localProduct"
import CulturalSitesPage from "./page/culturalSites"
import ProfilePage from "./page/profilePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/map" element={<IndonesiaMap />} />
      <Route path="/add-sites" element={<AddSitesPage />} />
      <Route path="/add-local-products" element={<AddLocalProductPage />} />
      <Route path="/lists" element={<ListsPage />} />
      <Route path="/local-products/:id" element={<LocalProductPage />} />
      <Route path="/sites/:id" element={<CulturalSitesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App;