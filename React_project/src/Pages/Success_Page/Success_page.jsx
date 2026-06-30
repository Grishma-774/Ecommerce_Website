

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./Success_page.css"
import { apiRequest } from "../../Util/AllApi.js"

function Success_page(){

    const navigate = useNavigate()

    const [latestOrder, setLatestOrder] = useState(null)

    const orderinfo = async ()=>{

        try{

            let response = await apiRequest(
                "https://ecommerce-backend-9tpa.onrender.com/orders/get_order/history/",
                {
                    method : 'GET',
                }
            )

            let result = await response.json()

            if(response.ok){

                if(result.length > 0){

                    setLatestOrder(result[0])

                }

            }
            else{

                console.log("success page failed", result)

            }

        }
        catch(error){

            console.log("error", error)

        }
    }

    useEffect(()=>{

        orderinfo()

    },[])

    return(

        <div className="order_container">

            <div className="order_box">

                {
                    latestOrder ? (

                        <>

                            <h1>
                                🎉 Order Placed Successfully!
                            </h1>

                            <p>
                                Your order has been confirmed.
                            </p>

                            <div className="customer_info">

                                <p>
                                    Thank you,
                                    <b> {latestOrder.name}❤️</b> 
                                </p>

                                <p>
                                    Order Code:
                                    <b> {latestOrder.order_code}</b>
                                </p>

                                <p>
                                    Payment Method:
                                    <b> {latestOrder.payment}</b>
                                </p>

                                <p>
                                    Payment Status:
                                    <b> {latestOrder.payment_status}</b>
                                </p>


                                <p>
                                    Total Paid:
                                    <b> ₹{latestOrder.total}</b>
                                </p>

                            </div>

                            <div className="success_btns">

                                <button
                                    onClick={()=>{
                                        navigate("/order_history")
                                    }}
                                >
                                    View Orders
                                </button>

                                <button
                                    onClick={()=>{
                                        navigate("/")
                                    }}
                                >
                                    Continue Shopping
                                </button>

                            </div>

                        </>

                    ) : (

                        <p className="no_order">
                            No recent order found
                        </p>

                    )
                }

            </div>

        </div>
    )
}

export default Success_page