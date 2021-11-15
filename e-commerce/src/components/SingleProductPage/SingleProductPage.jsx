import React from 'react';

import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import './SingleProductPage.css'


export function SingleProductPage({products1}) {
    const params = useParams();
    
    return (
        <div >
            <div className='back-btn'>
                <h3><Link to='/home'>{'<'}  Back To Home Page</Link></h3>
            </div>
            {products1.map((product) => {
            return <div> {(product.id == params.id) ?
            <div className='single-product-page'>
                <p className='product-title'>{product.title}</p>
                <img src={product.image} width={'150px'} alt={''}/>
                <p>{`${product.price} $`}</p>
                <p>{product.rating.rate}</p>
            </div>
            :
            null}   
            
            </div>
            
            })}

        </div>
    )

}

