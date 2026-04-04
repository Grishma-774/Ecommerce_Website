
import { useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useState , useEffect} from "react"

import "bootstrap-icons/font/bootstrap-icons.css"

function Navbar({cards,search_value}){

    const [value,setValue]=useState("")
    const[open,setOpen]=useState(false)
    const navigate=useNavigate()

    const setDarkMode = () => {
        document.body.classList.add("dark")
        document.body.classList.remove("light")
        localStorage.setItem("theme", "dark")
        setOpen(prev => !prev);
    }

    const setLightMode = () => {
        document.body.classList.add("light")
        document.body.classList.remove("dark")
        localStorage.setItem("theme", "light")
        setOpen(prev => !prev);
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.add("light")
        }
    }, [])

    let openstate = () => {
        setOpen(prev => !prev)
    }

    let Navigate=()=>{
        navigate('/cart_page')
    }

    let change=(e)=>{
         setValue(e.target.value)
    }

    let send_value=(e)=>{
        if (e.key === 'Enter') {
            navigate("/")
            search_value(value)
        }
    }
    return(
        <div>
            <div className="container">
                <div>
                    <h3>🛍️ MyShop</h3>
                </div>
                <div>
                    <input type="text" placeholder="🔍 search products..."value={value} onChange={change} onKeyDown={send_value} className="search"/>
                </div>
                <div className="container2">
                    <div className="container3">
                        <div>
                            <p className="home" onClick={()=>{navigate("/")}}>Home</p>
                        </div>
                        <div>
                            <p className="cart" onClick={Navigate}>Cart🛒({cards.reduce((sum, item) => sum + item.quantity, 0)})</p>
                        </div>
                    </div>
                    <div>
                        <i className="bi bi-list style" onClick={openstate}></i>
                    </div>
                </div>
            </div>
           {open && <div className="overlay"onClick={openstate} ></div>}
            <div className={`sidebar ${open ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div>
                    <h4 className="header"><i className="bi bi-gear-fill"></i> Settings</h4>
                </div>
                <div className="menu">
                    <div>
                        <p className="history" onClick={()=>{navigate("/order_history"); setOpen(prev => !prev);}}><i className="bi bi-clock-history"></i> Order History</p>
                    </div>
                    <div>
                        <p className="history" onClick={setDarkMode}><i className="bi bi-moon"></i> Dark Mode</p>
                    </div>
                    <div>
                        <p className="history" onClick={setLightMode}><i className="bi bi-sun"></i> Light Mode</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar