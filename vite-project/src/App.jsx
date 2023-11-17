import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/SignUp';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProducts';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/allproducts/AllProducts';



function App() {


  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }/>
          <Route path="/order" element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
          } />
          <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
          } />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={
          <ProtectedRoute>
            <ProductInfo />
          </ProtectedRoute>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/allproducts' element={<AllProducts/>}/>


          <Route path="/dashboard" element={
          <ProtectRouteAdmin>
            <Dashboard />
          </ProtectRouteAdmin>
          } />
          <Route path="/addproduct" element={
          <ProtectRouteAdmin>
            <AddProduct />
          </ProtectRouteAdmin>
          } />
          <Route path="/updateproduct" element={
          <ProtectRouteAdmin>
            <UpdateProduct />
          </ProtectRouteAdmin>
          } />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>

  )
}

export default App;

//user
 
export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user')
  if(!user){
    return <Navigate to={'/login'}/>
  }
  else{
    return children
  }
}

export const ProtectRouteAdmin = ({children})=>{
  const admin = JSON.parse(localStorage.getItem('user'))

  if(admin.username === "AkhibRahi786" ){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}


// admin//
