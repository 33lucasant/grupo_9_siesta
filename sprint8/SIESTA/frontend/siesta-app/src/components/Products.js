import React from 'react';
import { useState, useEffect } from 'react';
import {Link, Route, Routes} from 'react-router-dom';


function Products(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products/list')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <React.Fragment>
            <div>
                <div className='product-cards-container'>
                    <h3>Lista de productos</h3>
                    <div className='product-card-container'>
                        {products.map((product, i) => {
                            return (
                                <Link to={`/Products/${product.id}`} style={{textDecoration: 'none'}}>
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
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <script></script>
            </div>


        </React.Fragment>            
    )
}

export default Products;
