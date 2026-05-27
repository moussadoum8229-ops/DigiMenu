import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Contents from "./Components/Contents"
import Menu from "./Components/Menu"
import Commande from "./Components/Commande"
import Cuisine from "./Components/Cuisine"
import { CartProvider } from './Components/CartContext'
import Form from './Components/Form'
import Admin from './Components/Admin'

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
          <Route path="/Admin" element={<Admin />} /> 
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App