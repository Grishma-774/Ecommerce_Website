
import "./Category.css"
function Category({someFunction}){

    return(
        <div className="Outer">
            <div>
                <h3>Categories</h3>
            </div>
            <div className="C_container">
                <div >
                    <p onClick={()=>{someFunction("all")}} className="category_item">All</p>
                </div>
                <div>
                    <p onClick={()=>{someFunction("beauty")}} className="category_item">Beauty</p>
                </div>
                <div>
                    <p onClick={()=>{someFunction("fragrances")}} className="category_item">Fragrances</p>
                </div>
                <div>
                    <p onClick={()=>{someFunction("furniture")}} className="category_item">Furnitures</p>
                </div>
                <div>
                    <p onClick={()=>{someFunction("groceries")}} className="category_item">Groceries</p>
                </div>
            </div>
        </div>
    )
}

export default Category