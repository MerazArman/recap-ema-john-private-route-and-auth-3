import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const orderHandler = () =>{
        setCart([])
        setOrderPlaced(true);
        processOrder()
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart);
        const cartProduct = productsKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProduct)
    },[]);

            
    const removeHandler = (productKey) => {
        //console.log('click', product);
        const newCart = cart.filter(pds => pds.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    };

    let thanks ;
    if (orderPlaced) {
        thanks = <img src={happyImage}  alt="" />
    }

    return (
        <div className="shop-style">
            <div className="product-container">
            <h2> this is review {cart.length} </h2>
            {
                cart.map(pd => <ReviewItem product ={pd} removeHandler={removeHandler} key={pd.key}> </ReviewItem>)
            }
            {thanks}
            </div>
            <div>
                <Cart cart={cart}>
                <button onClick={orderHandler} className="add-cart-btn">Please Order</button>
                </Cart>
            </div>
           
        </div>
    );
};

export default Review;