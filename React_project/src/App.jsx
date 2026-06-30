import {  Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { useState } from "react"
import { useEffect } from "react"



import Protected_Route from"./Protected_Route_Page/ProtectedRoute.jsx"
import Public_Route from"./Public_Route_Page/PublicRoute.jsx"


import Login from "./Pages/Login/Login.jsx"
import Register from "./Pages/Register/Register.jsx"
import { apiRequest } from "./Util/AllApi.js"

import Layout from "./Layout/Layout.jsx"
import AdminOrderPage from "./Admin_Pages/AdminOrder_page/AdminOrderPage.jsx"
import AdminProtectedRoute from "./Admin_Protected_Route/AdminProtectedRoute.jsx"
import AdminOrderDetailsPage from "./Admin_Pages/Admin_OrderDetails_Page/AdminOrderDetailsPage.jsx"
import AdminDashboard from "./Admin_Pages/Admin_Dashboard_Page/AdminDashboard.jsx"
import AdminProductAdd from "./Admin_Pages/Admin_ProductAdd_Page/AdminProductAdd.jsx"
import AdminProductPage from "./Admin_Pages/Admin_Product_Page/AdminProductPage.jsx"
import AdminProductEdit from "./Admin_Pages/Admin_ProductEdit_Page/AdminProductEdit.jsx"

const Home = lazy(() => import("./Pages/Home/Home.jsx"))
const Cart = lazy(() => import("./Pages/Cart/Cart.jsx"))
const Product_details_page = lazy(() => import("./Pages/Product_Details/Product_details_Page.jsx"))
const Checkout_page = lazy(() => import("./Pages/Check_Out_Page/Checkout_page.jsx"))
const Order_History = lazy(() => import("./Pages/Order_History/Order_History.jsx"))
const Success_page = lazy(() => import("./Pages/Success_Page/Success_page.jsx"))
const Order_details = lazy(() => import("./Pages/Order_Details/Order_details.jsx"))


function App() {

  const[search_data,setSearch]=useState("")

  const [cart,setCart]=useState(null)

    function show_prod(value){
        setSearch(value)
    }

   const get_cart_data = async ()=>{

      try{

          let response = await apiRequest(
              "https://ecommerce-backend-9tpa.onrender.com/carts/cart_get/",
              {
                  method : 'GET',
              }
          )

          let result = await response.json()

          if(response.ok){
              setCart(result)
              // console.log(result)
          }
          else{
            console.log("issue")
          }

      }
      catch(error){
          console.log(error)
      }

  }

  useEffect(()=>{

    const token = localStorage.getItem("access")

    if(token){
        get_cart_data()
    }

  },[])


  return (
    <div className="nav_global">
      <link rel="icon" href="shopping.png" />
      <title>MyShop</title>

      <Suspense>
            <Routes>

                <Route element={<Protected_Route />}>

                    <Route element={<Layout cart={cart} setCart={setCart} get_cart_data={get_cart_data} search_value={show_prod} search_data={search_data} setSearch={setSearch}/>}>

                      {/* <Route path="/home" element={<Home/>}/> */}

                      <Route path="/cart_page" element={<Cart />}/>
                      {/* <Route path="/product_details_page/:id" element={<Product_details_page/>}/> */}
                      <Route path="/checkout" element={<Checkout_page />}/>
                      <Route path="/success" element={<Success_page/>}/>
                      <Route path="/order_history" element={<Order_History/>}/>
                      <Route path="/order_details/:id" element={<Order_details/>}/>

                    </Route>

                    <Route element={<AdminProtectedRoute/>}>

                        <Route path="/admin/orders" element={<AdminOrderPage/>}/>
                        <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage/>}/>
                        <Route path = "/admin_dashboard" element={<AdminDashboard/>}/>
                        <Route path = "/admin/products" element={<AdminProductPage/>}/>
                        <Route path = "/admin/products/add" element={<AdminProductAdd/>}/>
                        <Route path ="/admin/products/edit/:id" element={<AdminProductEdit/>}/>

                    </Route>
            
                </Route>


              <Route element={<Layout cart={cart} setCart={setCart} get_cart_data={get_cart_data} search_value={show_prod} search_data={search_data} setSearch={setSearch}/>}>

                  <Route path="/" element={<Home/>}/>
                  <Route path="/product_details_page/:id" element={<Product_details_page />} />
              
              </Route>

              <Route element={<Public_Route />}>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/Register" element={<Register/>}/>
              </Route>

            </Routes>
      </Suspense>
    </div>

  )
}

export default App
