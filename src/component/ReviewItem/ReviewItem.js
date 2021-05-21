import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    const {name, quantity, price, key} = props.product;
    return (
        <div className="review-item">
            <h4 className="product-name"> {name} </h4>
            <p>Quantity: {quantity} </p>
            <h6>price:{price} </h6>
            <br />
            <button className="add-cart-btn" onClick={()=> props.removeHandler(key)} >  Remove</button>

        </div>
    );
};

export default ReviewItem;