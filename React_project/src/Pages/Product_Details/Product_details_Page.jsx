import { useEffect, useState } from "react"
import{useParams, useOutletContext, useNavigate} from "react-router-dom"
import "./Product_details_page.css"
import { apiRequest } from "../../Util/AllApi.js"

function Product_details_page(){
    const {id}=useParams()
    const [error, setError] = useState(null)
    const [prod_data,setProd_data]=useState(null)
    const[exist,setExist]=useState(null)
    const { cart,get_cart_data } = useOutletContext()
    const navigate = useNavigate();

    async function Prod_fetch(){
        try{
            let prod_url=`https://ecommerce-backend-9tpa.onrender.com/products/${id}`
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

    const add_to_cart = async (prod_id)=>{

        const token = localStorage.getItem("access");

        if (!token) {
            navigate("/login");
            return;
        }

        let existingItem = cart?.data?.items?.find((item) => item.product.id === prod_id)

        try{

            let response = await apiRequest("https://ecommerce-backend-9tpa.onrender.com/carts/cart_add/",{
                method : 'POST',
                body : JSON.stringify({
                "items": [
                    {
                    "product": prod_id,
                    "quantity": 1
                    }
                ]
                })
            })

            if(response.ok){

                await get_cart_data()

                if (existingItem){
                    setExist(true);
                } else {
                    setExist(false);
                }

                setTimeout(() => {
                    setExist(null);
                   }, 2500);
                }
            else{

                const result = await response.json();
                console.log("error",result)

            }

        }
        catch(error){

            console.log(error)

        }
    }


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
                        <p className="prod_price">₹{prod_data.price}</p>
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
                        <button className="prod_addtocart" onClick={()=>{add_to_cart(prod_data.id)}}>ADD TO CART</button>
                        {exist===true && <div className="cart_exist_msg">
                             <p>Product already exists in the cart. Quantity increased.</p>
                        </div>}
                        {exist===false &&<div className="cart_exist_msg">
                            <p>Product added to cart successfully!</p>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Product_details_page