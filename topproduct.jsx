import "./topproduct.css";
import { Navbar } from './Navbar';

function TopProduct() {
    return (
        <div className="page">
            <Navbar />

            <div className="main">

                <h1 className="bestsold">Best Sold Product</h1>

                <h1 className="topproduct">Best Selling Product</h1>

                <div className="container">
                    <h1 className="type">Type:</h1>
                    <hr />

                   
                    <p>• Coke</p>
                    <p>• Rice</p>
                    <p>• Bread</p>

                </div>

            </div>
        </div>
    );
}

export default TopProduct;