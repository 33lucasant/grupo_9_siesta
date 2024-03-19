import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ProductDetail() {

    const id = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/products/${id.id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <React.Fragment>
             <div className='product-detail-container'>
                {product.images && (
                    <React.Fragment>
                        <div className='product-detail-img'>
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3001/img/products/${image.image}`}
                                    alt={`Product Image ${index + 1}`}
                                />
                            ))}
                        </div>
                        <div className='product-detail-description'>
                            <div className='description-div'>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Color: {product.color}</p>
                                <p>Talles: {product.size}</p>
                            </div>
                            <div className='price-div'>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    </React.Fragment>
                )}
                
            </div>

            
            
        </React.Fragment>            
    )
}

export default ProductDetail;