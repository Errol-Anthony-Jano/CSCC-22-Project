import "./sales.css";
import {Navbar} from "../MainFolder/Navbar";
import AddSales from "./addsales";
import RemoveSales from "./removesales";
import { useState } from "react";

function Sales() {
    const [showaddsales, setshowaddsales] = useState(false);
    const [showremovesales, setshowremovesales] = useState(false);
   
     return (
        <div>
            <Navbar/>
            <input type="search" placeholder="Search..." className="search1"/>
            <button className="add" onClick={()=> setshowaddsales(true)}>ADD</button>
            <button className="remove" onClick={() => setshowremovesales(true)}>REMOVE</button>

            <h1 className="soldtransactions">Sold Transactions</h1>
             
            <div className="container1">
            <h1 className="products">Products</h1>
             <h1 className="datentime">Date & Time</h1>
             <h1 className="method">Payment Method</h1>
             <h1 className="revenue">Revenue</h1>
             <h1 className="action">Action</h1>
             <hr className="line"/>
            </div>
          
           {showaddsales && <AddSales onClose={()=> setshowaddsales(false)} />}
            {showremovesales && <RemoveSales onClose={() => setshowremovesales(false)} />}
        </div>
          
    )
}
export default Sales;