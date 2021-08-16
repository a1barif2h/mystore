/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import baseUrl from "../helpers/baseUrl";

const CartItem = ({products, token}) => {
    const [allProducts, setAllProducts] = useState(products)
    let price = 0

    console.log(allProducts)

    if(allProducts && allProducts.length < 1) {
        return (
            <div className='center-align'>
                <h3>Please select product to view your cart.</h3>
            </div>
        )
    }

    const handleRemove = async (id) => {
        const response = await fetch(`${baseUrl}/api/cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                productId: id
            })
        })
        const result = await response.json()
        if(result.error) {
            M.toast({ html: result.error, classes: "red" });
        } else {
            setAllProducts(result.products)
            M.toast({ html: result.success, classes: "green" });
        }
        console.log(result)
    }

    const handleCheckout = (info) => {
        console.log(info)
    }

    return (
        <div>
             {allProducts.map(item=>{
                price = price + item.quantity * item.product.price
                  return(
                      <div style={{display:"flex",margin:"20px"}} key={item._id}>
                          <img src={item.product.mediaUrl} style={{width:"30%"}}/>
                          <div style={{marginLeft:"20px"}}>
                              <h6>{item.product.name}</h6>
                              <h6>{item.quantity} x  <span style={{fontSiz: 14, fontWeight: 900}}>৳</span> {item.product.price}</h6>
                              <button className="btn red" onClick={()=>{handleRemove(item.product._id)}}>remove</button>
                          </div>
                      </div>
                  )
              })}
               <div className="container" style={{display:"flex",justifyContent:"space-between"}}>
                <h5>total <span style={{fontSiz: 14, fontWeight: 900}}>৳</span> {price}</h5>
                {products.length != 0
                &&  <StripeCheckout
                name="My store"
                amount={price * 100}
                image={products.length > 0 ? products[0].product.mediaUrl:""}
                currency="BDT"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                stripeKey="pk_test_51JOltNSGqiXUOsqvAWDMqqFETtkqYX9PoLeUc8YoBWXo8lA45xY2QrjwUDJh4WNFGKz3lDeoS7Jt0inEpRM8Zewb00nR2hLbR8"
                token={(paymentInfo)=>handleCheckout(paymentInfo)}
                > 
                <button className="btn">Checkout</button>
                </StripeCheckout>
                }
              
            </div>
        </div>
    );
};

export default CartItem;