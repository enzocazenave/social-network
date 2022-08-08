import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../../styles/social_network/NavBar.css';
import { startLogout } from '../../store/auth';
import { useForm } from '../../hooks/useForm';
import { getAllUsers } from '../../helpers/getAllUsers';
import { setSearchedUsers } from '../../store/social_network';
import { useState } from 'react';

const initialForm = {
    usernameToSearch: ''
}

export const NavBar = () => {
    
    const {usernameToSearch, onInputChange, onResetForm } = useForm(initialForm);
    const [placeholder, setPlaceholder] = useState("Buscar usuarios");
    const { uid, username } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(startLogout());
    }

    const onSearch = (e) => {
        e.preventDefault();
        
        const normalizeUsername = usernameToSearch.toLowerCase().trim();
        const resultUsers = [];

        getAllUsers().then((users) => {

            for (const user of users) {
                if (user.username.includes(normalizeUsername)) {
                    if (user.uid !== uid) resultUsers.push(user);
                }
            }

            if (resultUsers.length > 0) {
                dispatch(setSearchedUsers(resultUsers));
                navigate('/search');
            } else {
                setPlaceholder('Usuario no encontrado');   
            }

            onResetForm();
        });
    }

    return (
        <nav className="navbar-container">
            <form onSubmit={ onSearch } className="navbar-container__form" role="search">
                <input name="usernameToSearch" value={ usernameToSearch } onChange={ onInputChange } className="form-control" type="search" placeholder={ placeholder } />
                <button onSubmit={ onSearch } className="btn btn-secondary" type="submit"><i className="bi bi-search"></i></button>
            </form>

            <div className="navbar-container__form">
                <RouterLink to="/"><i className="bi bi-house fs-2 nav-icon"></i></RouterLink>
                <RouterLink to="/profile"><i className="bi bi-person-circle fs-2 nav-icon"></i></RouterLink>
                <RouterLink to="/profile"><i className="bi bi-sliders fs-2 nav-icon"></i></RouterLink>
            </div>
            
            <button title="Cerrar sesión" onClick={ onLogout } className="btn btn-success logout-button"><i className="bi bi-arrow-bar-left"></i>{username}</button>
        </nav>
    )
}
