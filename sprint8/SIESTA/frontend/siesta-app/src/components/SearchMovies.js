import {useState, useEffect, useRef} from 'react';

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
			const response = await fetch(`http://localhost:3001/api/products/search?keywords=${keyword}`);
			const data = await response.json();
			console.log(data)
			setProducts(data.Search || []);
		} catch (error) {
			console.error(error);
		}
	};

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
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							products.length > 0 && products.map((product, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{product.name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={product.images[0].image}
														alt={product.name} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{product.price}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ products.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
		</div>
	)
}

export default SearchMovies;
