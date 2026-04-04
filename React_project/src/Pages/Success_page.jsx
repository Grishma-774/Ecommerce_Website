

import { useNavigate } from "react-router-dom"
import "./Success_page.css"
function Success_page(){
    const navigate=useNavigate()
    const orders = JSON.parse(localStorage.getItem("order_details")) || []
    const latestOrder = orders.length ? orders[orders.length - 1] : null
    return(
        <div className="order_container">
            <div className="order_box">
                {latestOrder?(
                    <>
                        <h1>🎉 Order Placed Successfully!</h1>
                        <p>Your order has been confirmed.</p>
                        <div className="customer_info">
                            <p>Thank you, <b>{latestOrder.name}</b> ❤️</p>
                            <p>Order ID: <b>{latestOrder.id}</b></p>
                            <h3>🛒 Ordered Items:</h3>
                            {latestOrder.items.length>0 ? (latestOrder.items.map((item)=>(
                                <div key={item.id} className="item_details">
                                    <p>Product title : <b>{item.title}</b> </p>
                                    <p>Quantity: <b>{item.quantity}</b> </p>
                                    <p>Price: <b>{item.price * item.quantity}</b> </p>
                                </div>
                            ))):(<p className="no_order">No items found</p>)}
                            <p>Total Paid: <b>${latestOrder.total.toFixed(2)}</b></p>
                        </div>
                    </>
                ):(
                <p className="no_order">No recent order found</p>
                )}
                <button onClick={()=>navigate("/")}>
                    Continue Shopping
                </button>
            </div>
        </div>
    )
}

export default Success_page
