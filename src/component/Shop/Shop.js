import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10Data = fakeData.slice(0,10);
    const [products , setProducts] = useState(first10Data)
    const [cart , setCart] = useState([]);  

    
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productsKeys = Object.keys(saveCart);
        const previousCart = productsKeys.map((pdKey) => {
            const product = fakeData.find(pd => pd.key === pdKey)
            product.quantity = saveCart[pdKey]
            return product
        } )
        setCart(previousCart)
    },[])

                      //  -----------btn handel er function-------
                           
    function hendelerAddCart (product){
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd =>  pd.key === toBeAddedKey)
        let count = 1;
        let newCart ;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
    //     const sameProduct = newCart.filter(pd =>  pd.key === product.key)
    //    const count = sameProduct.length;
       addToDatabaseCart(product.key, count)
    }
                              // **************** //

    return (
        <div className ='shop-style'>
        
            <div className="product-container">
             
                {
                    products.map(pd => <Product product={pd} showAddToCart={true} hendelerAddCart = {hendelerAddCart} key={pd.key}> </Product>)
                }
            

            </div>

            <div className="cart-container">
              <Cart cart={cart}> 
              <Link to="/review">
            <button className="add-cart-btn">Review Order</button>
            </Link>
           
               </Cart>
            </div>

            
        </div>
    );
};

export default Shop;