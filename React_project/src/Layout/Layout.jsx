
import Navbar from "../Components/Navbar/Navbar.jsx"
import { Outlet } from "react-router-dom"
import "./Layout.css"

function Layout({ cart,setCart,get_cart_data,search_value,search_data ,setSearch}) {

    return (
        <div>
            <Navbar cart={cart} setCart={setCart} search_value={search_value} />

            <div className="page-content">
                <Outlet  context={{cart,setCart,get_cart_data,search_data,setSearch}} />
            </div>
        </div>
    )
}

export default Layout