
import "./Home.css"

import Products from "../Components/Products";
import Category from "../Components/Category";
import { useState } from "react";

function Home({cart,setCart,search_data}){
    const [cat,setCat]=useState("all")

    let yourFunction=(catg)=>{
        setCat(catg)
    }

    let updated_card
    let add_cart=(card)=>{
        let same=cart.find((item)=>(item.id===card.id))
        if(same){
           updated_card = cart.map((item)=>{
                if(item.id===card.id){
                    return({...item,quantity: item.quantity+1})
                }
                else{
                    return item
                }
            })  
        }
        else{
            updated_card=[...cart,{...card,quantity:1}]
        }
        setCart(updated_card)
    }
    return(
        <div className="h_container">
            <Category someFunction={yourFunction}/>
            <Products category={cat} cart_fun={add_cart} search_data={search_data} />
        </div>
    )
}

export default Home