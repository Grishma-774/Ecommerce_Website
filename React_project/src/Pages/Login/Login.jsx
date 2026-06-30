
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"


import { useState } from "react";

function Login(){

    const [loading, setLoading] = useState(false)

    const [data,setData]=useState({username:"",password:""})

    const [error,setError]=useState({})

    const navigate =useNavigate()

    const handleevent=(event)=>{
        const {name,value}=event.target

        setData({
            ...data,
            [name]:value
        })

    }

    const validate_form=(event)=>{

        event.preventDefault()

        let newError={}

        if(!data.username){
            newError["username"]="username required"
        }

        if(!data.password){
            newError["password"]="password required"
        }

        setError(newError);

        if(Object.keys(newError).length===0){

            async function verify_user(){

                try{

                    setLoading(true)

                    let response = await fetch("https://ecommerce-backend-9tpa.onrender.com/api/token/",{

                        method : "POST",
                        headers : {
                             'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(data)
                    })
 
                    let result = await response.json()

                    if(response.ok){

                        localStorage.setItem("access", result.access);
                        localStorage.setItem("refresh", result.refresh);

                        const userResponse = await fetch(
                            "https://ecommerce-backend-9tpa.onrender.com/accounts/me/",
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${result.access}`
                                }
                            }
                        )

                        const userData = await userResponse.json()

                        // store user details

                        localStorage.setItem(
                            "user",
                            JSON.stringify(userData)
                        )

                        console.log("successfully logged in")
                        setData({username:"",password:""})

                        if(userData.is_staff){

                             window.location.href = "/admin_dashboard";

                        }
                        else{
                            window.location.href = "/"
                        }

                    }
                    else{
                        console.log("server error",result)
                        setError(result)
                    }
                }
                catch(error){

                    console.log("Network error",error)
                    setError({general : "Unable to connect to server. Please try again."})

                }
                finally{
                    setLoading(false)
                }

            }

            verify_user()
        }

    }


    return(
        <div className="login-con">

            <div className="login-con2" >

                <div className="heading">
                    <p>MyShop</p>
                    <p className="logo-icon">🛍️</p>
                </div>

                <div className="welcome-msg-con">
                    <p>Welcome Back!</p>
                    <p>Sign in to manage your tasks</p>
                </div>

                <div className="input-con">
                    
                    <form onSubmit={validate_form} className="form">

                            <input type="text" placeholder="Username" className="input_style" name="username" value={data.username} onChange={handleevent}/>
                            {error.username && <p className={ error.username ? "error" : "" }>{error.username}</p>}


                            <input type="password" placeholder="Password"  className="input_style" name="password" value={data.password} onChange={handleevent} />
                            {error.password && <p className={error.password ? "error" : "" }>{error.password}</p>}


                            {error.detail && <p className="error">{error.detail}</p>}


                            <button className="loginbtn" type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>

                    </form>


                </div>

                <div className="forgot">
                    <p>Forgot Password?</p>
                </div>

                <div className="footer">
                    <p>Don't have an account?</p>
                    <p><Link to="/register">Register</Link></p>
                </div>

            </div>

        </div>
    )
}

export default Login

