import React, {useState} from 'react'
import { Link } from 'react-router-dom';


import './SingleProduct.css';


function SingleProduct({product,calculate}) {

    const [inputValue, setInputValue] = useState(product.amount);


    const calculatePrice = () => {
        return (product.price * product.amount).toFixed(2)
    }

    const f = (e) => {
        product.amount = e.target.value
        calculate()
        setInputValue(console)
    }

    return (
        
        <div className="single-product" key={product.id} >
            <p>{product.title}</p>
            <img src={product.image} width={'100px'} alt={''}/>
            <input className='inp-single-product' onChange={f} value = {product.amount} type='number'></input>
            <p>price: ${calculatePrice()}</p>
            <p>rating: {product.rating.rate}</p>
            {console.log("🚀 ~ file: SingleProduct.jsx ~ line 31 ~ SingleProduct ~ product.amount", product.amount)}
        </div>

    )
}

export default SingleProduct
