
import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { apiRequest } from "../../Util/AllApi.js"

import "./AdminOrderDetailsPage.css"

function AdminOrderDetailsPage(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [order, setOrder] = useState(null)

    const [loading, setLoading] = useState(true)

    const [orderStatus, setOrderStatus] = useState("")

    const [paymentStatus, setPaymentStatus] = useState("")

    const getOrderDetails = async ()=>{

        try{

            const response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/orders/admin/order_details/${id}/`,
                {
                    method : "GET",
                }
            )

            const result = await response.json()

            if(response.ok){

                setOrder(result)

                setOrderStatus(result.order_status)

                setPaymentStatus(result.payment_status)

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

        getOrderDetails()

    },[id])



    const updateOrder = async ()=>{

        try{

            const response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/orders/admin/orders/${id}/`,
                {
                    method : "PATCH",
                    body : JSON.stringify({
                        order_status : orderStatus,
                        payment_status : paymentStatus
                    })
                }

            )

            console.log(orderStatus)
            console.log(paymentStatus)

            const result = await response.json()

            if(response.ok){

                alert("Order updated successfully ✅")

                await getOrderDetails()

            }
            else{

                console.log(result)

            }

        }
        catch(error){

            console.log(error)

        }

    }


    if(loading){

        return <p>Loading order details...</p>

    }

    if(!order){

        return <p>No order found</p>

    }

    return(

        <div className="admin_order_details_container">

            <div className="top_section">

                <h2>Order Details 🧾</h2>

                <button
                    className="back_btn"
                    onClick={()=>{
                        navigate(-1)
                    }}
                >
                    Back
                </button>

            </div>



            <div className="details_card">

                <h3>Customer Information</h3>

                <p><b>Name:</b> {order.name}</p>

                <p><b>Phone:</b> {order.phone}</p>

                <p><b>Address:</b> {order.address}</p>

                <p><b>City:</b> {order.city}</p>

                <p><b>State:</b> {order.state}</p>

                <p><b>Pincode:</b> {order.pincode}</p>

            </div>



            <div className="details_card">

                <h3>Order Information</h3>

                <p><b>Order Code:</b> {order.order_code}</p>

                <p><b>Payment Method:</b> {order.payment}</p>

                <p><b>Created:</b> {order.created_at}</p>

            </div>



            <div className="details_card">

                <h3>Ordered Products</h3>

                {
                    order.items.map((item)=>(

                        <div key={item.id} className="product_item">

                            <p>
                                <b>{item.product.title}</b>
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>

                            <p>
                                ₹{item.price}
                            </p>

                        </div>

                    ))
                }

            </div>



            <div className="details_card">

                <h3>Price Summary</h3>

                <p>
                    <b>Subtotal:</b> ₹{order.subtotal}
                </p>

                <p>
                    <b>Shipping Fee:</b> ₹{order.shipping_fee}
                </p>

                <h2>
                    Total: ₹{order.total}
                </h2>

            </div>



            <div className="details_card">

                <h3>Update Order</h3>

                <div className="update_section">

                    <div>

                        <label>Order Status</label>

                        <select
                            value={orderStatus}
                            onChange={(e)=>{
                                setOrderStatus(e.target.value)
                            }}
                        >

                            <option value="placed">
                                Placed
                            </option>

                            <option value="processing">
                                Processing
                            </option>

                            <option value="shipped">
                                Shipped
                            </option>

                            <option value="delivered">
                                Delivered
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>



                    <div>

                        <label>Payment Status</label>

                        <select
                            value={paymentStatus}
                            onChange={(e)=>{
                                setPaymentStatus(e.target.value)
                            }}
                        >

                            <option value="pending">
                                Pending
                            </option>

                            <option value="paid">
                                Paid
                            </option>

                            <option value="failed">
                                Failed
                            </option>

                        </select>

                    </div>

                </div>



                <button
                    className="update_btn"
                    onClick={updateOrder}
                >
                    Update Order
                </button>

            </div>

        </div>

    )
}

export default AdminOrderDetailsPage