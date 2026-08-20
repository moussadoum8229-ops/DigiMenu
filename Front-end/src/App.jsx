import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Contents from "./Components/Contents"
import Menu from "./Components/Menu"
import Commande from "./Components/Commande"
import Cuisine from "./Components/Cuisine"
import { CartProvider } from './Components/CartContext'
import Dashboard from './Components/Dashboard'
import Form from './Components/Form'
import Commandes_D from './Components/Commandes_D'
import Menu_D from './Components/Menu_D'
import Cuisiniers_D from './Components/Cuisiniers_D'
import Administrateurs_D from './Components/Administrateurs_D'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Contents />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/commande" element={<Commande />} />
          <Route path="/cuisine" element={<Cuisine />} /> 
          <Route path="/form" element={<Form />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/commandes-d" element={<Commandes_D />} />
          <Route path="/menu-d" element={<Menu_D />} />
          <Route path="/cuisiniers-d" element={<Cuisiniers_D />} />
          <Route path="/administrateurs-d" element={<Administrateurs_D />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App