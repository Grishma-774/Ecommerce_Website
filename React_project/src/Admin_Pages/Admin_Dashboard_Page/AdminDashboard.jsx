
import { useNavigate } from "react-router-dom"

import "./AdminDashboard.css"


function AdminDashboard(){

    const navigate = useNavigate()

    const logout = () => {

        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("user")

        navigate("/")
    }

    return(

        <div className="admin_dashboard_container">


            <div className="admin_topbar">

                <div>
                    <h1>Admin Dashboard ⚙️</h1>
                    <p>Manage products, orders and store operations</p>
                </div>

                <button className="logout_btn" onClick={logout}>
                    Logout 🚪
                </button>

            </div>


            <div className="admin_cards_container">

                <div className="admin_card" onClick={()=>navigate("/admin/orders")}>
                    <h2>📦 Orders</h2>
                    <p>View and manage customer orders</p>
                    <button>Manage Orders</button>
                </div>

                <div className="admin_card" onClick={()=>navigate("/admin/products")}>
                    <h2>🛍 Products</h2>
                    <p>Add, edit and manage products</p>
                    <button>Manage Products</button>
                </div>

            </div>

        </div>

    )
}

export default AdminDashboard