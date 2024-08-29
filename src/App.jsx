import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Main from './components/Main'
import AllSupliers from './components/AllSupliers'
import CreateSupplier from './components/CreateSupplier'
import Supplier from './components/Supplier'
import UpdateSupplier from './components/UpdateSupplier'
import AllOrders from './components/AllOrders'
import Order from './components/Order'
import CreateOrder from './components/CreateOrder'
import SupplierTracking from './components/SupplierTracking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
     <Route path='/' element={<Main/>}/>
     <Route path='/all-suppliers' element={<AllSupliers/>}/>
     <Route path='/create-supplier' element={<CreateSupplier/>}/>
     <Route path='/supplier/:id' element={<Supplier/>}/>
     <Route path='/supplier/update/:id' element={<UpdateSupplier/>}/>
     <Route path='/all-orders' element={<AllOrders/>}/>
     <Route path='/order/:id' element={<Order/>}/>
     <Route path='/create-order' element={<CreateOrder/>}/>   
     <Route path='/tracking' element={<SupplierTracking/>}/>   
    </Routes>
    </Router>
  )
}

export default App
