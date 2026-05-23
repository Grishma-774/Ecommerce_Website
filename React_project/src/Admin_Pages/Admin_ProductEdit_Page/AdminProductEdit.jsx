
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../Admin_ProductAdd_Page/AdminProductAdd.css" 
import { apiRequest } from "../../Util/AllApi.js"
  

function AdminProductEdit() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        rating: "",
        category: "",
        description: "",
        thumbnail: null
    })

    const [loading, setLoading] = useState(true)

    // ---------------- GET SINGLE PRODUCT ----------------
    const getProduct = async () => {
        try {

            const response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/products/${id}/`,
                {
                    method: "GET",
                }
            )

            const result = await response.json()

            if (response.ok) {
                setFormData({
                    title: result.title,
                    price: result.price,
                    stock: result.stock,
                    rating: result.rating,
                    category: result.category,
                    description: result.description,
                    thumbnail: null   // file not prefilled
                })
            }
            else {
                console.log(result)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [id])

   
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0]
        })
    }

    // ---------------- UPDATE PRODUCT (PATCH) ----------------
    const handleUpdate = async (e) => {
        e.preventDefault()

        try {

            const form = new FormData()
            form.append("title", formData.title)
            form.append("price", formData.price)
            form.append("stock", formData.stock)
            form.append("rating", formData.rating)
            form.append("category", formData.category)
            form.append("description", formData.description)

            if (formData.thumbnail) {
                form.append("thumbnail", formData.thumbnail)
            }

            const response = await apiRequest(
                `https://ecommerce-backend-9tpa.onrender.com/products/admin/products/${id}/`,
                {
                    method: "PATCH",
                    body: form
                }
            )

            const result = await response.json()

            if (response.ok) {
                alert("Product updated successfully ✅")
                navigate("/admin/products")
            }
            else {
                console.log(result)
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <p className="loading_text">Loading product...</p>
    }

    return (
        <div className="admin_add_container">

            <h2>Edit Product ✏️</h2>

            <button className="back-btn" onClick={()=>{navigate(-1)}}>Back</button>

            <form onSubmit={handleUpdate} className="product_form">

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
    )
}

export default AdminProductEdit