
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "./Order_details.css"
import { useEffect, useState } from "react"
import { apiRequest } from "../../Util/AllApi.js"

function Order_details(){
    const {id}=useParams()

    const navigate = useNavigate()

    const [orderdetails,setOrderDetails]=useState(null)
    const [loading, setLoading] = useState(true)

    const orderDetails = async ()=>{

        try{

            let response = await apiRequest( `https://ecommerce-backend-9tpa.onrender.com/orders/get_order_details/${id}`,{
                method : 'GET',
            })

            let result = await response.json()

            if(response.ok){
                
                setOrderDetails(result)
            }
            else{
                console.log("issue",result)
            }
        }
        catch(error){

            console.log("error",error)

        }
        finally{

            setLoading(false)

        }
    }

    useEffect(()=>{

        orderDetails()

    },[id])

    if(loading){

        return <p className="no_order">Loading order details...</p>

    }

    if(!orderdetails){
        return <p className="no_order">No order found ❌</p>
    }
    else{
        return(
                <div className="order_details_container">
                    <h2>Order Details 🧾</h2>

                    <div className="order_info">
                        <p>
                            <b>Name:</b> {orderdetails.name}
                        </p>
                        <p>
                            <b>Order Code:</b> {orderdetails.order_code}
                        </p>
                        <p>
                            <b>Payment:</b> {orderdetails.payment}
                        </p>

                        <p>
                            <b>Payment Status:</b> {orderdetails.payment_status}
                        </p>

                        <p>
                            <b>Order Status:</b> {orderdetails.order_status}
                        </p>
                    </div>

                    <hr />

                    <div className="items_section">
                        {orderdetails.items.map((item)=>(
                            <div key={item.id} className="item_card">
                                <p className="title">{item.product.title}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>₹{item.price}</p>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <div className="total_section">
                        <p>
                            <b>Subtotal:</b> ₹{orderdetails.subtotal}
                        </p>

                        <p>
                            <b>Shipping Fee:</b> ₹{orderdetails.shipping_fee}
                        </p>
                        <h3>
                            Total: ₹{orderdetails.total}
                        </h3>
                    </div>
                    <button onClick={()=>navigate(-1)}>⬅ Back</button>
                </div>
            )
    }
}

export default Order_details