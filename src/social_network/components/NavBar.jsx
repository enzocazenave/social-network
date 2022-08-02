import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import '../../styles/social_network/NavBar.css';
import { startLogout } from '../../store/auth';

export const NavBar = () => {
    
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar-container">
            <form className="navbar-container__form" role="search">
                <input className="form-control" type="search" placeholder="Search" />
                <button className="btn btn-secondary" type="submit"><i className="bi bi-search"></i></button>
            </form>

            <div className="navbar-container__form">
                <RouterLink to="/"><i className="bi bi-house fs-2 nav-icon"></i></RouterLink>
                <RouterLink to="/profile"><i className="bi bi-person-circle fs-2 nav-icon"></i></RouterLink>
                <RouterLink to="/profile"><i className="bi bi-sliders fs-2 nav-icon"></i></RouterLink>
            </div>
               
            
            <button onClick={ onLogout } className="btn btn-success logout-button"><i className="bi bi-arrow-bar-left"></i>Cerrar sesión</button>
        </nav>
    )
}
