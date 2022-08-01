import { Link as RouterLink } from 'react-router-dom';

import '../../styles/auth.css';

export const LoginPage = () => {
    console.log("LoginPage: loaded")

    return (
        <div className="form-container animate__animated animate__fadeIn">
            <div className="form-container__info">
                <h1>social-network</h1>
                <p>social-network te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>

            <form className="form-container__form">
                <input className="form-control" type="text" placeholder="Correo electrónico" />
                <input className="form-control" type="text" placeholder="Contraseña" />
                <button className="btn btn-primary">Iniciar sesión</button>
                <RouterLink className="change-password-redirect" to="/auth/change">¿Has olvidado la contraseña?</RouterLink>
                <hr/>
                <RouterLink className="btn btn-success" to="/auth/register">¿No tienes cuenta? <strong>Crea una</strong></RouterLink>
            </form> 
        </div>
    )
}
