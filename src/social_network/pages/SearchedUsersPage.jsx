import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/social_network/SearchedUsers.css';
import { NavBar } from '../components';


export const SearchedUsersPage = () => {

    const { searchedUsers: users } = useSelector(state => state.social_network);
    const { uid } = useSelector(state => state.auth);
    
    return (
        <>
        <NavBar />

            <div className="searched-users-container animate__animated animate__fadeIn">
                <h2 className="text-center">Resultados de busqueda ({ users.length })</h2>

                <div className="searched-users">
                {
                    (users.length > 0)
                    ?   users.map(user  => {
                            return( 
                                <Link to={`/profile/${user.uid}`} key={ user.uid } className="user animate__animated animate__fadeIn">
                                    <div className="user-container">
                                        <img className="user-image" src={ user.photoURL } />
                                        <div className="user-info">
                                            <strong className="user-username">@{ user.username }<br/></strong>
                                            <cite className="user-name">{ user.name }</cite>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    :   <cite className="">No hay usuarios con ese nombre</cite>
                }
                </div>
            </div>
        </>
    )
}

