import { Link, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { useEffect, useState } from "react"

import Navbar from "./Components/Navbar"

import "./App.css"

const Home = lazy(() => import("./Pages/Home"))
const Cart = lazy(() => import("./Pages/Cart"))
const Product_details_page = lazy(() => import("./Pages/Product_details_Page"))
const Checkout_page = lazy(() => import("./Pages/Checkout_page"))
const Order_History = lazy(() => import("./Pages/Order_History"))
const Success_page = lazy(() => import("./Pages/Success_page"))
const Order_details = lazy(() => import("./Pages/Order_details"))


function App() {

  const[search_data,setSearch]=useState("")

  const [cart,setCart]=useState(()=>{
    return JSON.parse(localStorage.getItem("cart_items")) || []
  })
   
  function show_prod(value_of_search){
    setSearch(value_of_search)
  }


  useEffect(()=>{
    localStorage.setItem("cart_items",JSON.stringify(cart))
  },[cart])

  return (
    <div className="nav_global">
      <link rel="icon" href="shopping.png" />
      <title>MyShop</title>
      <Navbar cards={cart} search_value={show_prod}/>
      <Suspense>
            <Routes>
              <Route path="/" element={<Home cart={cart} setCart={setCart} search_data={search_data} />}/>
              <Route path="/cart_page" element={<Cart cart={cart} setCart={setCart} />}/>
              <Route path="/product_details_page/:id" element={<Product_details_page cart={cart} setCart={setCart} />}/>
              <Route path="/checkout" element={<Checkout_page cart={cart} setCart={setCart}/>}/>
              <Route path="/success" element={<Success_page/>}/>
              <Route path="/order_history" element={<Order_History/>}/>
              <Route path="/order_details/:id" element={<Order_details/>}/>
          </Routes>
      </Suspense>
    </div>

  )
}

export default App
