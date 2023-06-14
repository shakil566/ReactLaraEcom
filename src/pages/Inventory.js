import React, {  } from "react";
import ProductPurchase from "./ProductPurchase";
import ProductSale from "./ProductSale";
 
function Inventory()
{
    return(
        <React.Fragment>
            <ProductPurchase/>
            <ProductSale/>
        </React.Fragment>
    );
}
export default Inventory;