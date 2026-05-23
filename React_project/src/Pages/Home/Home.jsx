
import "./Home.css"

import Products from "../../Components/Products/Products.jsx";
import Category from "../../Components/Category/Category.jsx";
import { useState } from "react";
import { useOutletContext } from "react-router-dom"


function Home(){

    const [cat,setCat]=useState("all")
    const { search_data,setSearch} = useOutletContext()

    let yourFunction=(catg)=>{
        setCat(catg)
    }

    return(
        <div className="h_container">
            <Category someFunction={yourFunction}/>
            <Products category={cat} search_data={search_data} setSearch={setSearch} />
        </div>
    )
}

export default Home