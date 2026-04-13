import "./topproduct.module.css";
import {Navbar} from "../MainFolder/Navbar";

function TopProduct() {
    return (
        <div className="page">
            <Navbar/>
            <div className="main">
            <h1 className="bestsold">Best Sold Product</h1>
             <h1 className="topproduct">Best Selling Product</h1>
             <div className="container">
            <h1 className="type">Type:</h1>
            <hr />
            </div>
           </div>
        </div>  
    )
}
export default TopProduct; 