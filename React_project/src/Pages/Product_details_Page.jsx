import { useEffect, useState } from "react"
import{useParams } from "react-router-dom"

import "./Product_details_page.css"

function Product_details_page({cart,setCart}){
    const {id}=useParams()
    const [error, setError] = useState(null)
    const [prod_data,setProd_data]=useState(null)
    const[exist,setExist]=useState(null)

    async function Prod_fetch(){
        try{
            let prod_url=`https://dummyjson.com/products/${id}`
            let prod_response= await fetch(prod_url)
            if (!prod_response.ok) throw new Error("Failed to fetch product")
            let prod_result =await prod_response.json()
            setProd_data(prod_result)
        }
        catch (err) {
            setError(err.message)
        }
    }

    useEffect(()=>{
            Prod_fetch()
    },[id])

    if (error) return <p>{error}</p>

    if(!prod_data){
        return(
            <div className="prod_load_con">
                <p className="prod_load_msg">Loading product...</p>
            </div>
        )
    }
    else{
        return(
            <div className="prod_container">
                <div className="prod_image_con">
                    <img src={prod_data.thumbnail} alt={prod_data.title} className="prod_image" />
                </div>
                <div className="Prod_details_con">
                    <div>
                        <p className="prod_title">{prod_data.title} </p>
                    </div>
                    <div>
                        <p className="prod_price">${prod_data.price}</p>
                    </div>
                    <div className="Prod_rate_con">
                        <p>⭐</p>
                        <p>{prod_data.rating}</p>
                        <p>({Math.floor(Math.random() * 500 + 50)})</p>
                    </div>
                    <div>
                        <p className="prod_desc">{prod_data.description}</p>
                    </div>
                    <div>
                        <button className="prod_addtocart" onClick={()=>{
                            let items
                            let existingItem=cart.find((item)=>(item.id===prod_data.id))
                            if(existingItem){
                                items =cart.map((item)=>{
                                    if(item.id===prod_data.id){
                                        return({...item,quantity:item.quantity+1})
                                    }
                                    else{
                                        return item
                                    }
                                })
                                setExist(true)
                            }
                            else{
                                items=[...cart,{...prod_data,quantity:1}]
                                setExist(false)

                            }
                            setCart(items)
                        }}
                        >ADD TO CART</button>
                        {exist===true && <div className="cart_exist_msg">
                             <p>Product already exist in cart & Quantity increased in cart</p>
                        </div>}
                        {exist===false &&<div className="cart_exist_msg">
                            <p>Product added to the cart successfully!</p>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product_details_page