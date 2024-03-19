import React from 'react';
import image from '../assets/images/LOGO-siesta2.png';
import ContentWrapper from './ContentWrapper';
import Products from './Products';
import ContentRowCards from './ContentRowCards';
import NotFound from './NotFound';
import {Link, Route, Routes} from 'react-router-dom';
import SearchMovies from './SearchMovies';
import ProductDetail from './ProductDetail';
import Users from './Users';
import LastProduct from './LastProduct';
import LastUser from './LastUser';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="logo-siesta" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - SIESTA</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/Products">
                        <i className="fas fa-socks fa-chart-area"></i>
                        <span>Products</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/LastProduct">
                        <i className="fas fa-tshirt fa-chart-area"></i>
                        <span>Last Product</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/Users">
                        <i className="fas fa-users fa-chart-area"></i>
                        <span>Users</span></Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/LastUser">
                        <i className="fas fa-user fa-chart-area"></i>
                        <span>Last User</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/ContentRowCards">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></Link>
                </li>

                <li className="nav-item nav-link">
                <Link className="nav-link" to="/search">
                        <i className="fas fa-fw fa-search"></i>
                        <span>Search</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            <Routes>
                <Route exact path="/" element={<ContentWrapper/>}/>
                <Route path="/Products" element={<Products/>}/>
                <Route path="/LastProduct" element={<LastProduct/>}/>
                <Route path="/Users" element={<Users />}/>
                <Route path="/LastUser" element={<LastUser/>}/>
                <Route path="/ContentRowCards" element={<ContentRowCards/>}/>
                <Route path="/search" element={<SearchMovies />}/>
                <Route path="/Products/:id" element={<ProductDetail />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;