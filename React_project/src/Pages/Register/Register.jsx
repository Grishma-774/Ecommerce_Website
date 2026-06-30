

import "./Register.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register(){

    const [loading, setLoading] = useState(false)

    const [formData,setFormData]=useState({username:"",email:"",password:"",confirm_pass:""})

    const[error,setError]=useState({})

    const navigate = useNavigate()

    const handleevent=(event)=>{
        const {name,value}=event.target;
        setFormData(
            {
                ...formData,
                [name]:value
            }
        )
    }


    const validate = (event) => { 
        event.preventDefault(); 

        let newErrors = {}; 

        if (!formData.username.trim()){ 

            newErrors.username = "Username is required"; 
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter valid email";
        }
        
        if (!formData.password.trim()){ 
            newErrors.password = "Password is required"; 
        } 
        else if (formData.password.length < 8) { 
            newErrors.password = "Password must be at least 8 characters"; 
        } 
        else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
            newErrors.password ="Password must contain uppercase letter and number";
        }
        
        if (!formData.confirm_pass.trim()) { 
            newErrors.confirm_pass = "Confirm password is required"; 
        } 
        else if (formData.confirm_pass !== formData.password) { 
            newErrors.confirm_pass = "Passwords did not match"; 
        } 
        
        setError(newErrors); 
        
        if (Object.keys(newErrors).length === 0) {
              
           
             
            const send_data=async () => {

                try{
                        setLoading(true)

                        let response = await fetch("https://ecommerce-backend-9tpa.onrender.com/accounts/registration/",{
                            
                            method : "POST",
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify(formData)
                        })

                        let result = await response.json()


                        if (response.ok) {
                            console.log("Registration successful:", result);

                            setFormData({
                                username: "",
                                email: "",
                                password: "",
                                confirm_pass: ""
                            });

                            navigate("/login")
                        } 
                        else{
                            console.log("server error",result)
                            setError(result)
                        }

                }
                catch(error) {
                    console.error("Network error:", error);
                    setError({
                        general: "Unable to connect to server. Please try again."
                    });
                }
                finally{
                    setLoading(false)
                }
                

            }

            send_data()

        } 


    };

    const renderError = (field) => {
            if (!error[field]) return null;

            return (
                <p className="error">
                    {Array.isArray(error[field]) ? error[field][0] : error[field]}
                </p>
            );
    };
       

    return(
        <div className="reg-con1">
        
            <div className="reg-con2">
        
                    <div className="Heading1">
                        <p>MyShop</p>
                        <p className="logo-icon">🛍️</p>
                    </div>
        
                    <div className="Heading2">
                        <p>Create Your Account!</p>
                        <p>Start managing tasks today</p>
                    </div>

                    <div>
                        {renderError("general")}
                    </div>
        
                    <div className="inputs">

                        <form onSubmit={validate} className="form">
                            
                           <input type="text" placeholder="Username" className="inputstyles" name="username" onChange={handleevent} value={formData.username} />
                              {renderError("username")}
                            <input type="email" placeholder="Email" className="inputstyles"  name="email" onChange={handleevent} value={formData.email}/>
                               {renderError("email")}
                            <input type="password" placeholder="Password" className="inputstyles" name="password" onChange={handleevent} value={formData.password}/>
                               {renderError("password")}
                            <input type="password" placeholder="Confirm Password" className="inputstyles" name="confirm_pass" onChange={handleevent} value={formData.confirm_pass} />
                               {renderError("confirm_pass")}

                            <button type="submit" className="regbtn" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>

        
                        </form>

                    </div>
            
                    <div className="footer1">
                        <p>Already have an account?</p>
                        <p><Link to="/login">Login</Link></p>
                    </div>

            </div>
        
        </div>
    )
}

export default Register