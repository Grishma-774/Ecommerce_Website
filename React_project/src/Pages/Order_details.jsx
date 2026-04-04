
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "./Order_details.css"

function Order_details(){
    const {id}=useParams()

    const navigate = useNavigate()

    const order_data=JSON.parse(localStorage.getItem("order_details")) || []

    const data_by_id=order_data[Number(id)]

    if(!data_by_id){
        return <p className="no_order">No order found ❌</p>
    }
    else{
        return(
                <div className="order_details_container">
                    <h2>Order Details 🧾</h2>

                    <div className="order_info">
                        <p><b>Name:</b> {data_by_id.name}</p>
                        <p><b>Order ID:</b> {data_by_id.id}</p>
                    </div>

                    <hr />

                    <div className="items_section">
                        {data_by_id.items.map((item)=>(
                            <div key={item.id} className="item_card">
                                <p className="title">{item.title}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>${item.price}</p>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <div className="total_section">
                        <h3>Total: ${data_by_id.total.toFixed(2)}</h3>
                    </div>
                    <button onClick={()=>navigate(-1)}>⬅ Back</button>
                </div>
            )
    }
}

export default Order_details