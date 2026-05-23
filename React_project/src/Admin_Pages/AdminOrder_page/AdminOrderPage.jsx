

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./AdminOrderPage.css"

import { apiRequest } from "../../Util/AllApi.js"

function AdminOrderPage(){

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const getOrders = async () => {

        try{

            const response = await apiRequest(
                "https://ecommerce-backend-9tpa.onrender.com/orders/admin/all_orders/",
                {
                    method: "GET",
                }
            )

            const result = await response.json()

            if(response.ok){

                setOrders(result)

            }
            else{

                console.log(result)

            }

        }
        catch(error){

            console.log(error)

        }
        finally{

            setLoading(false)

        }

    }

    useEffect(()=>{

        getOrders()

    },[])

    if(loading){

        return <p className="admin_loading">Loading orders...</p>

    }

    return(

        <div className="admin_orders_container">

            <div className="admin_heading">

                <h2>Admin Orders 📦</h2>

                <p>Manage all customer orders</p>

            </div>

            {
                orders.length > 0 ? (

                    <div className="orders_grid">

                        {
                            orders.map((order)=>(

                                <div key={order.id}className="order_card">

                                    <div className="order_top">

                                        <h3>{order.order_code}</h3>

                                        <span className="order_status">
                                            {order.order_status}
                                        </span>

                                    </div>

                                    <p>
                                        <b>Customer:</b> {order.name}
                                    </p>

                                    <p>
                                        <b>Total:</b> ₹{order.total}
                                    </p>

                                    <p>
                                        <b>Payment:</b> {order.payment}
                                    </p>

                                    <p>
                                        <b>Payment Status:</b> {order.payment_status}
                                    </p>

                                    <button
                                        className="view_btn"
                                        onClick={()=>{
                                            navigate(
                                                `/admin/orders/${order.id}`
                                            )
                                        }}
                                    >
                                        View Details
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <p className="no_orders">
                        No orders found
                    </p>

                )
            }

        </div>

    )
}

export default AdminOrderPage