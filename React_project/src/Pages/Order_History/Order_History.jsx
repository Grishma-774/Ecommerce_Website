
import { useNavigate } from "react-router-dom"
import "./Order_History.css"
import { useEffect, useState } from "react"
import { apiRequest } from "../../Util/AllApi.js"

function Order_History(){

    const navigate=useNavigate()
    const [orderhistory,setOrderHistory] = useState([])

    const order_history_fetch = async ()=>{

        try{

            let response = await apiRequest("https://ecommerce-backend-9tpa.onrender.com/orders/get_order/history/",{
                method : 'GET',
            })

            let result = await response.json()

            if(response.ok){
                setOrderHistory(result)
            }
            else{

                console.log("issue",result)
            }

        }
        catch(error){

            console.log("error",error)

        }
    }

    useEffect(()=>{

        order_history_fetch()

    },[])


    if(orderhistory.length === 0){
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
                    orderhistory.map((item)=>(
                        <div className="order_each_card" key={item.id}>
                            <div className="order_top">
                                <p>Order ID: {item.order_code}</p>
                                <p>Name: {item.name}</p>
                            </div>

                            <div className="order_bottom">
                                <p>Total: ₹{item.total}</p>
                                <button onClick={() => navigate(`/order_details/${item.id}`)}>View Details</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

}

export default Order_History