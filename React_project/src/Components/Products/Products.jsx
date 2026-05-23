
import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { apiRequest } from "../../Util/AllApi.js"

function Products({category,search_data}){

    const [data,setData]=useState([])
    const [loading, setLoading] = useState(true)
    const { get_cart_data } = useOutletContext()
    const navigate=useNavigate()

    let Navigation = (Prod_details) => {
    navigate(`/product_details_page/${Prod_details.id}`)
    }

    async function P_details(){
        setLoading(true)
        try{
            let url = `https://ecommerce-backend-9tpa.onrender.com/products/?search=${search_data}&category=${category}`
            let response = await fetch(url)
            let result = await response.json()
            // console.log(result)
            setData(result)
        }
        catch(error){
            console.log("Error fetching products", error)
        }
        finally{
            setLoading(false)
        }

    }

    const add_to_cart = async (prod_id)=>{

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

            let result = await response.json()

            if(response.ok){
                // console.log("successfully added to the cart",result)
                await get_cart_data()
            }
            else{

                console.log("error",result)

            }
        }
        catch(error){

            console.log(error)

        }
    }


    useEffect(()=>{
            P_details()
    },[search_data, category])

    if (loading) {
        return (
            <div className="prod_load_con">
                 <p className="prod_load_msg">Loading products...</p>
            </div>
        )
    }

    const filterdata = data

    return(
            <div className="grid_container">
                {
                    filterdata.map((details)=>(
                        <div className="card" key={details.id} onClick={()=>{Navigation(details)}}>
                            <div className="img_container">
                                <img src={details.thumbnail} alt={details.title} className="image" crossOrigin="anonymous" />
                                
                            </div>
                            <div className="t_container">
                                <p className="title">{details.title}</p>
                            </div>
                            <div className="rating">
                                <p>⭐</p>
                                <p>{details.rating}</p>
                                <p>({Math.floor(Math.random() * 500 + 50)})</p>
                            </div>
                            <div className="price_container">
                                <p className="price">₹ {details.price}</p>
                            </div>
                            <div className="Addtocart" onClick={(e)=>{e.stopPropagation(); add_to_cart(details.id)}}>
                                <p className="addcart">ADD TO CART</p>
                            </div>
                        </div>

                    ))
                }
            </div>
        )
}

export default Products