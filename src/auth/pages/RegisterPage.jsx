import { Link as RouterLink } from 'react-router-dom';

import '../../styles/auth.css';

export const RegisterPage = () => {
    console.log("RegisterPage: loaded")

    return (
        <div className="form-container animate__animated animate__fadeIn">
            <div className="form-container__info">
                <h1>social-network</h1>
                <p>social-network te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>

            <form className="form-container__form">
                <div className="fullname-field">
                    <input className="form-control" type="text" placeholder="Nombre" />
                    <input className="form-control" type="text" placeholder="Apellidos" />
                </div>

                <input className="form-control mb-6" type="text" placeholder="Nombre de usuario" />
                <input className="form-control mb-6" type="email" placeholder="Correo electrónico" />
                <input className="form-control mb-6" type="password" placeholder="Contraseña" />

                <button className="btn btn-primary mb-0">Crear cuenta</button>

                <hr/>
                <RouterLink className="btn btn-success" to="/auth/login">¿Ya tienes cuenta? <strong>Inicia sesión</strong></RouterLink>
            </form> 
        </div>
    )
}
