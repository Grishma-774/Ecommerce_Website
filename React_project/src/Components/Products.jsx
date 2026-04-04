
import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

function Products({category,cart_fun,search_data}){

    const [data,setData]=useState([])

    const [loading, setLoading] = useState(true)
    const navigate=useNavigate()

    let Navigation = (Prod_details) => {
    navigate(`/product_details_page/${Prod_details.id}`)
    }

    async function P_details(){
        try{
            let url="https://dummyjson.com/products"
            let response= await fetch(url)
            let result =await response.json()
            console.log(result)
            setData(result.products)
        }
        catch(error){
            console.log("Error fetching products", error)
        }
        finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
            P_details()
    },[])

    if (loading) {
        return (
            <div className="prod_load_con">
                 <p className="prod_load_msg">Loading products...</p>
            </div>
        )
    }

    let filterdata = data

    .filter((item) =>
        category === "all" ? true : item.category?.toLowerCase() === category.toLowerCase()
    ).filter((item) =>
        search_data === ""
        ? true
        : item.title.toLowerCase().includes(search_data.toLowerCase())
    )

    return(
            <div className="grid_container">
                {
                    filterdata.map((details)=>(
                        <div className="card" key={details.id} onClick={()=>{Navigation(details)}}>
                            <div className="img_container">
                                <img src={details.thumbnail } alt={details.title} className="image" />
                                
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
                                <p className="price">${details.price}</p>
                            </div>
                            <div className="Addtocart" onClick={(e)=>{e.stopPropagation(); cart_fun(details);}}>
                                <p className="addcart">ADD TO CART</p>
                            </div>
                        </div>

                    ))
                }
            </div>
        )
}

export default Products