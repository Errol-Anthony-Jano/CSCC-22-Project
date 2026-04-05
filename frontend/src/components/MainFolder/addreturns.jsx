function AddReturns({onClose}) {
     return (
        <div className="addpopsbg">
            <div className="addpops">
                <h1 className="addreturnstitle">Adding Return Item</h1>
                <h3>Products:</h3>
                <input type="text" placeholder="Enter Product Name" className="text-design"/>
                <h3>Date & Time:</h3>
                <input type="datetime-local" className="text-design"/>
                <h3>Quantity:</h3>
                <input type="number" placeholder="Enter Quantity" className="text-design"/>
                <h3>Reason:</h3>
                <input type="text" placeholder="Enter Reason" className="text-design"/>
                <button className="buttonpop">Add</button>
                <br />
                <button className="buttonpop" onClick={onClose}>Cancel</button> {/*will be back */}
       
        </div>
        </div>
       
    )
}
export default AddReturns;