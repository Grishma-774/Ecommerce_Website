
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AdminProductAdd.css"

import { apiRequest } from "../../Util/AllApi.js"


function AdminProductAdd() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        rating:"",
        category: "",
        description: "",
        thumbnail: null
    })

    const [loading, setLoading] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const form = new FormData()
            form.append("title", formData.title)
            form.append("price", formData.price)
            form.append("stock", formData.stock)
            form.append("category", formData.category)
            form.append("description", formData.description)
            form.append("rating", formData.rating)
            form.append("thumbnail", formData.thumbnail)


            const response = await apiRequest(
                "https://ecommerce-backend-9tpa.onrender.com/products/admin/products/",
                {
                    method: "POST",
                    body: form
                }
            )

            const result = await response.json()

            if (response.ok) {
                alert("Product added successfully ✅")
                navigate("/admin/products")
            } else {
                console.log(result)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin_add_container">
            

            <h2>Add New Product 🛍</h2> 


            <button className="back-btn" onClick={()=>{navigate(-1)}}>Back</button>
    

            <form onSubmit={handleSubmit} className="product_form">

                <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0 - 5)"
                    step="0.1"
                    min="0"
                    max="5"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>

            </form>

        </div>
    )
}

export default AdminProductAdd