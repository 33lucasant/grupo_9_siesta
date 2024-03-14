import React from 'react';
import { useState, useEffect } from 'react';


function LastMovieInDb(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <div className='product-cards-container'>
                <h5>LISTA DE PRODUCTOS</h5>
                <div className='product-card-container'>
                    {products.map((product, i) => {
                        return (
                            <div className="product-card">
                                <div className='product-description'>
                                    <div className='product-name'>
                                        <p>{product.name}</p>
                                    </div>
                                    <div className='product-price'>
                                        <p>${product.price}</p>  
                                    </div>
                                </div>
                                <img src={`http://localhost:3001/img/products/${product.images[0].image}`}/>                                
                            </div>
                        )
                    })}
                </div>
            </div>

            <script></script>
        </div>

        
    )
}

export default LastMovieInDb;
