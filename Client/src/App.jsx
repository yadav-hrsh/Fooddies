import React, { useState } from 'react'
import Home from "./Views/Home";
import Products from './Views/Products';
import { Routes, Route } from 'react-router-dom';
import Cart from './Views/Cart';
import Order from './Views/Order';
import Login from './Views/Login';
import Register from './Views/Register';
function App() {
  const [islogin, setislogin] = useState();

  return (
    <div className=' overflow-y-scroll scrollbar-thumb-neutral-900 scrollbar-thin'>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App