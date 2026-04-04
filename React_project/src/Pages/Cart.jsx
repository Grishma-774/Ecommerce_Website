

import { useNavigate } from "react-router-dom"
import "./Cart.css"


function Cart({cart,setCart}){

    
    const navigate=useNavigate()

    let plus=(id)=>{
        let updated_quant = cart.map((item)=>{
            if(item.id===id){
                return({...item,quantity:item.quantity+1})
            }
            else{
                return item
            }
        })
        console.log(updated_quant)
        setCart(updated_quant)

    } 

    let minus = (id) => {
        let updated_quantity = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item
            }).filter((item) => item.quantity > 0) 
        setCart(updated_quantity)
    }

    let remove=(remove_id)=>{
        let remove_cart=cart.filter((item)=>(
            item.id!==remove_id
        ))
        setCart(remove_cart)
    }

    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if(cart.length===0){
        return(
            <div className="empty">
                    <h2>Your Cart is Empty 🛒</h2>
                    <p>Browse products and add items</p>
                    <button className="continue_shopping" onClick={()=>{navigate("/")}}>Continue Shopping</button>
            </div>
        )
    }
    else{
      return(
        <div className="cart_container">
            <div className="item_container">
                {
                    cart.map((item)=>(
                        <div className="cart_card" key={item.id}>
                            <div>
                                <img src={item.thumbnail} alt="" className="cart_image"/>
                            </div>
                            <div className="cart_details">
                                <p>Product Name : {item.title}</p>
                                <p>Price: {item.price}$</p>
                                <div className="Quantity">
                                    <p>Quantity: {item.quantity}</p>
                                    <p className="Q_icon"  onClick={()=>{plus(item.id)}}>+</p>
                                    <p className="Q_icon"onClick={()=>{minus(item.id)}} >-</p>
                                </div> 
                                <p className="remove" onClick={()=>remove(item.id)}>Remove</p>
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
                                    <p className="Amount_item">Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                                </div>
                                <div>
                                    <p className="Amount_item">Subtotal: ${subtotal.toFixed(2)} </p>
                                </div>
                                <div>
                                    <p className="Amount_item">Shipping: $40 </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className="total">Total: ${(subtotal+40).toFixed(2)} </p>
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