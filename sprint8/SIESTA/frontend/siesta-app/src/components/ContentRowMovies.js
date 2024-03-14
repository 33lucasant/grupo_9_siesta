import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect } from 'react';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let moviesInDB = {
    title: 'Movies in Data Base',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title:' Total awards', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title:'Actors quantity' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function ContentRowMovies(){

    const [products, setProducts] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data.data)
            })
            .catch(error => console.log(error))
    }, [])



    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;