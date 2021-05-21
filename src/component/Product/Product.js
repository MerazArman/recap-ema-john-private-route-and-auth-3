import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.product)
    const {img , name, seller, price , stock,key } = props.product;
    return (
        <div className="products-container">
            
            <div>
                <img src={img} alt="" />

            </div>
            <div className='product-ditails'>
                <h4 className="product-name"> <Link to={"/product/"+key}> {name} </Link>  </h4>
                <p> by {seller} </p>
                <p> $ {price} </p>
                <p> only {stock}  left in stock - order soon </p>
                <br/>
                
                {props.showAddToCart && <button className="add-cart-btn" onClick={ () => props.hendelerAddCart( props.product)}>  <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                }
                 
                   
                  
                
               
            </div>
        </div>
    );
};

export default Product;