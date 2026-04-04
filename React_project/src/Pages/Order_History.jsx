
import { useNavigate } from "react-router-dom"
import "./Order_History.css"
function Order_History(){

    const navigate=useNavigate()
    const order_his=JSON.parse(localStorage.getItem("order_details")) || []

    if(order_his.length === 0){
        return (
            <div className="no_orders">
                <h2>No Orders Yet 🛍️</h2>
                <p>Start shopping to see your orders here!</p>
            </div>
        )
    }
    else{
            return(
            <div className="order_card">
                {
                    order_his.map((item,index)=>(
                        <div className="order_each_card" key={item.id}>
                            <div className="order_top">
                                <p>Order ID: {item.id}</p>
                                <p>Name: {item.name}</p>
                            </div>

                            <div className="order_bottom">
                                <p>Total: ${item.total}</p>
                                <button onClick={() => navigate(`/order_details/${index}`)}>View Details</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

}

export default Order_History