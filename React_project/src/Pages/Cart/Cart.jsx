

import { useNavigate } from "react-router-dom"
import "./Cart.css"
import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { apiRequest } from "../../Util/AllApi.js"


function Cart(){

    const { cart,get_cart_data } = useOutletContext()

    useEffect(()=>{

        get_cart_data()

    },[])

    
    const navigate=useNavigate()

    
    const update_quantity = async (item_id,quantity)=>{

        try{

            let response = await apiRequest(`https://ecommerce-backend-9tpa.onrender.com/carts/items/${item_id}/`,{
                method : 'PATCH',
                body : JSON.stringify(
                    {
                        "quantity" : quantity
                    }
                )

            })

            let result = await response.json()

            if(response.ok){
                // console.log("success",result)
                await get_cart_data()
            }
            else{
                console.log("issue",result)
            }
        }
        catch(error){

            console.log("error",error)
        }

    }

    const remove_item = async (item_id)=>{

        try{

            let response = await apiRequest(`https://ecommerce-backend-9tpa.onrender.com/carts/items/delete/${item_id}/`,{
                method : 'DELETE',
            })

            if(response.ok){
                // console.log("success")
                await get_cart_data()
            }
            else{
                let result = await response.json()
                console.log("issue",result)
            }
        }
        catch(error){

            console.log("error",error)
        }
    }

    
    if(!cart || cart?.data?.items?.length === 0){
        return(
            <div className="empty">
                    <h2>Your Cart is Empty 🛒</h2>
                    <p>Browse products and add items</p>
                    <button className="continue_shopping" onClick={()=>{navigate("/home")}}>Continue Shopping</button>
            </div>
        )
    }
    else{
      return(
        <div className="cart_container">
            <div className="item_container">
                {
                    cart.data.items.map((item)=>(
                        <div className="cart_card" key={item.id}>
                            <div>
                                <img src={item.product.thumbnail} alt="" className="cart_image"/>
                            </div>
                            <div className="cart_details">
                                <p>Product Name : {item.product.title}</p>
                                <p>Price: ₹{item.product.price}</p>
                                <div className="Quantity">
                                    <p>Quantity: {item.quantity}</p>
                                    <p className="Q_icon" onClick={()=>{update_quantity(item.id,item.quantity+1)}}>+</p>
                                    <p className="Q_icon" onClick={()=>{if(item.quantity > 1){update_quantity(item.id,item.quantity-1)}}}>-</p>
                                </div> 
                                <p className="remove" onClick={()=>{remove_item(item.id)}}>Remove</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="summary">
                <div>
                    <p className="heading">Order Summary</p>
                </div>
                <div className="cal_con">
                    <div className="calculation">
                            <div className="charges">
                                <div>
                                    <p className="Amount_item">Items:{cart.data.items.reduce((acc,item)=> acc + item.quantity,0)}</p>
                                </div>
                                <div>
                                    <p className="Amount_item">Subtotal:₹{cart.data.subtotal} </p>
                                </div>
                                <div>
                                    <p className="Amount_item">Shipping: ₹{cart.data.shipping_fee} </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className="total">Total: ₹{cart.data.final_total} </p>
                                </div>
                            </div>

                            <div>
                                <button className="checkout_btn" onClick={()=>{
                                    navigate("/checkout")
                                }}>Checkout Button</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )}

}

export default Cart