
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AdminProductPage.css"
import { apiRequest } from "../../Util/AllApi.js"

function AdminProductPage(){

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("all")

    
    const getProducts = async () => {

        try{

            let response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/products/admin/products/?search=${search}&category=${category}`,
                {
                    method: "GET",
                }
            )

            const result = await response.json()

            if(response.ok){
                setProducts(result)
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
        getProducts()
    },[search, category])

    // ---------------- DELETE ----------------
    const delete_product = async(product_id)=>{

        try{

            let response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/products/admin/products/${product_id}/`,
                {
                    method : 'DELETE',
                }
            )

            if(response.ok){
                alert("Deleted ✅")
                await getProducts()
            }

        }
        catch(error){
            console.log(error)
        }
    }

    if(loading){
        return <p>Loading products...</p>
    }

    return(
        <div className="admin_product_container">

            {/* HEADER */}
            <div className="admin_product_header">

                <div>
                    <h1>Products 🛍</h1>
                    <p>Manage all store products</p>
                </div>

                <button
                    className="add_btn"
                    onClick={()=>navigate("/admin/products/add")}
                >
                    + Add Product
                </button>
            </div>

            {/* SEARCH + FILTER */}
            <div className="filter_bar">

                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                </select>

            </div>

            {/* PRODUCTS */}
            <div className="product_grid">

                {
                    products.map((product)=>(
                        <div key={product.id} className="product_card">

                            <img src={product.thumbnail} />

                            <h3>{product.title}</h3>

                            <p>₹{product.price}</p>

                            <p>Stock: {product.stock}</p>

                            <div className="btn_group">

                                <button onClick={()=>navigate(`/admin/products/edit/${product.id}`)}>
                                    Edit
                                </button>

                                <button onClick={()=>delete_product(product.id)} className="delete_btn">
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default AdminProductPage