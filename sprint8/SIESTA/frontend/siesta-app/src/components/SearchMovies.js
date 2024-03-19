import {useState, useEffect, useRef} from 'react';
import {Link, Route, Routes} from 'react-router-dom';

function SearchMovies(){

	const [products, setProducts] = useState([]);

	const [keyword, setKeyword] = useState('Blazer');

	const searchInput = useRef(null);

	const searchSubmit = (e) => {
		e.preventDefault();
		setKeyword(searchInput.current.value);
	};
	
	const getProduct = async () => {
		try {
			const response = await fetch(`http://localhost:3001/api/products?keywords=${keyword}`);
			const data = await response.json();
			setProducts(data.data || []);
		} catch (error) {
			console.error(error);
		}
	};

	console.log(products)

	useEffect(() => {

		if (keyword !== '') {
			getProduct()
		} else {
			setProducts([])
		}

	}, [keyword]);
	
	

	return(
		<div className="container-fluid">
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={searchSubmit}>
								<div className="form-group">
									<label htmlFor="">Buscar productos:</label>
									<input type="text" className="form-control" ref={searchInput}/>
								</div>
								<button className="btn btn-info" type='submit'>Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Productos para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							<div className='product-search-cards-container'>
								<div className='product-search-card-container'>
									{products.length > 0 && products.map((product, i) => {
										return (
											
											<Link to={`/products/${product.id}`} style={{textDecoration: 'none'}}>
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
									})
									}
								</div>
							</div>
						}
					</div>
					{ products.length === 0 && <div className="alert alert-warning text-center">No se encontraron productos</div>}
		</div>
	)
}

export default SearchMovies;
