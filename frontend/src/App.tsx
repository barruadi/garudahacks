import { Routes, Route } from "react-router-dom"
import './App.css'

import SignUp from "./page/signUp"
import SignIn from "./page/signIn"
import IndonesiaMap from "./page/map"
<<<<<<< Updated upstream
import AddSitesPage from "./page/addPageSites"
import AddLocalProductPage from "./page/addLocalProductPage"
import SplashPage from "./page/splash"
import ListsPage from "./page/lists"
=======
import LocalProductPage from "./page/localProduct"
import TestPage from "./page/test"
>>>>>>> Stashed changes

function App() {

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/map" element={<IndonesiaMap />} />
<<<<<<< Updated upstream
      <Route path="/add-sites" element={<AddSitesPage />} />
      <Route path="/add-local-products" element={<AddLocalProductPage />} />
      <Route path="/lists" element={<ListsPage />} />
=======
      <Route path="/local-products/:id" element={<LocalProductPage />} />
      <Route path="/test3d" element={<TestPage />} />
>>>>>>> Stashed changes
    </Routes>
  )
}

export default App
