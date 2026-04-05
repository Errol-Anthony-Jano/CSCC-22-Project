import {Navbar} from "../MainFolder/Navbar";
import AddReturns from "./addreturns";

import { useState } from "react";
function Returns() {
        const [showaddreturns, setshowaddreturns] = useState(false);
       
    
    return (
        <div>
            <Navbar/>
             <input type="search" placeholder="Search..." className="search1"/>
            <button className="add" onClick={()=> setshowaddreturns(true)}>ADD</button>
            <button className="remove">REMOVE</button>

            <h1 className="soldtransactions">Returned Items</h1>
             
            <div className="container1">
                
            <h1>Products</h1>
             <h1>Date & Time</h1>
             <h1>Quantity</h1>
             <h1>Reason</h1>
             <h1>Action</h1>
                <hr className="line"/>
           
            </div>
              {showaddreturns && <AddReturns onClose={()=> setshowaddreturns(false)} />}
             
           
        </div>
          
        
    )
}
export default Returns;
        