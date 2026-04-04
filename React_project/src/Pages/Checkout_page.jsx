
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Check_out_page.css"
function Checkout_page({cart,setCart}){
        const navigate=useNavigate()
        const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: ""
    })

    const [error_msg,setError_msg]=useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: ""
    })

    let handle_change=(e)=>{
        const {name,value}=e.target 

        if ((name === "phone" || name === "pincode") && !/^\d*$/.test(value)){
            return;
        }

        setForm((prev)=>(
            {...prev,[name]:value}
        ))

        setError_msg({
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            payment: ""
        })
    }

    const place_order = () => {
        let newErrors = {
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            payment: ""
        }

        if (!form.name) newErrors.name = "Name required"
        if (!form.address) newErrors.address = "Address required"
        if (!form.city) newErrors.city = "City required"
        if (!form.state) newErrors.state = "State required"
        if (!form.payment) newErrors.payment = "Select payment option"

        if (!form.phone) {
            newErrors.phone = "Phone required"
        } 
        else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Must be 10 digits"
        }

        if (!form.pincode) {
            newErrors.pincode = "Pincode required"
        } 
        else if (!/^\d{6}$/.test(form.pincode)) {
            newErrors.pincode = "Must be 6 digits"
        }

        setError_msg(newErrors)

        const hasError = Object.values(newErrors).some((err) => err !== "")

        if (hasError) {
            return
        }

        const new_order={
            id: Date.now(),
            name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            payment: form.payment,
            items: cart,
            total: subtotal + 40
        }

        const existingOrders = JSON.parse(localStorage.getItem("order_details")) || []

        localStorage.setItem("order_details",JSON.stringify([...existingOrders,new_order]))

        
        setCart([])

        setForm({
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            payment: ""
        })

        navigate("/success")
    }

    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return(
        <div className="check_out_container">
            <div className="check_out_details">
                <div className="check_out_address">
                   <div>
                        <h3>🧍 Shipping Details:</h3>
                   </div>
                   <div>
                        <label>Full Name:</label> <input type="text" className="name" name="name" value={form.name} onChange={handle_change}/>
                        {error_msg.name&& <span className="error_style">{error_msg.name}</span>}
                   </div>
                    <div>
                        <label>Phone Number:</label> <input type="text"  className="phone" name="phone" value={form.phone} onChange={handle_change}/>
                        {error_msg.phone && <span className="error_style">{error_msg.phone}</span>}
                    </div>
                    <div>
                        <label>Address Line:</label> <input type="text" className="add" name="address" value={form.address} onChange={handle_change} />
                        {error_msg.address && <span className="error_style">{error_msg.address}</span>}
                    </div>
                    <div>
                        <label>City:</label>  <input type="text" className="add" name="city" value={form.city} onChange={handle_change} />
                        {error_msg.city && <span className="error_style">{error_msg.city}</span>}
                    </div>
                    <div>
                        <label>State:</label> <input type="text" className="add" name="state" value={form.state} onChange={handle_change} />
                        {error_msg.state && <span className="error_style">{error_msg.state}</span>}
                    </div>
                    <div>
                         <label>Pincode:</label> <input type="text" className="add" name="pincode" value={form.pincode} onChange={handle_change}/>
                         {error_msg.pincode && <span className="error_style">{error_msg.pincode}</span>}
                    </div>
                </div>
                <div className="Pay_heading">
                    <div>
                        <h3>💳 Payment Options:</h3>
                    </div>
                    <div className="Pay_options">
                        <div>
                            <input type="radio" name="payment" value="cash_on_delivery" onChange={handle_change} checked={form.payment === "cash_on_delivery"}/> <label>Cash on Delivery</label>
                        </div>
                        <div>
                            <input type="radio" name="payment" value="upi" onChange={handle_change} checked={form.payment === "upi"}/><label> UPI</label>
                        </div>
                        <div>
                            <input type="radio" name="payment" value="card_payment" onChange={handle_change} checked={form.payment === "card_payment"}/> <label>Card Payment</label>
                        </div>
                        {error_msg.payment && <span className="error_style">{error_msg.payment}</span>}
                    </div>
                </div>
            </div>
            <div className="Total_calculations">
                <div className="Total_calculations_sub">
                    <div>
                        <p className="check_subtotal">Subtotal: ${subtotal.toFixed(2)} </p>
                    </div>
                    <div>
                        <p className="check_del_fee">Delivery Fee: $40</p>
                    </div>
                    <div>
                        <p className="check_total">Total: ${(subtotal+40).toFixed(2)} </p>
                    </div>
                    <div>
                        <button className="place_order" onClick={place_order}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout_page