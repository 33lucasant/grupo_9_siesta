import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect } from 'react';

function ContentRowCards(){

    const [products, setProducts] = useState([]);

    const [users, setUsers] = useState([]);

    const [images, setImages] = useState([]);

    const [categories, setCategories] = useState([]);

    const [womenProducts, setWomenProducts] = useState([]);

    const [menProducts, setMenProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products/list')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data.meta)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data.meta)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/products/images')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setImages(data.meta)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/products/categories')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCategories(data)
            })
            .catch(error => console.log(error))
    }, [])

    const totalCategories = {
        name: 'Total de categorías',
        total: categories.length,
        icon: 'fa-ellipsis-v'
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/products/women')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setWomenProducts(data.meta)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/products/men')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMenProducts(data.meta)
            })
            .catch(error => console.log(error))
    }, [])

    let cartProps = [products, users, images, totalCategories, womenProducts, menProducts];

    return (
    
        <div className="row">
            
            {cartProps.map( (cart, i) => {

                return <SmallCard {...cart} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowCards;