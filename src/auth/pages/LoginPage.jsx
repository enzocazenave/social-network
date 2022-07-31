import { Link as RouterLink } from 'react-router-dom';

import '../../styles/auth.css';

export const LoginPage = () => {
    return (
        <div className="form-container">
            <div className="form-container__info">
                <h4>social-network</h4>
                <p>social-network te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>

            <form className="form-container__form">
                <input className="form-control" type="text" placeholder="Correo electrónico" />
                <input className="form-control" type="text" placeholder="Contraseña" />
                <button className="btn btn-primary">Iniciar sesión</button>
            </form> 
        </div>
    )
}
