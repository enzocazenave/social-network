import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import '../../styles/auth/auth.css';
import { useDispatch } from 'react-redux/';

const initialForm = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
}

const formValidations = {

}

export const RegisterPage = () => {
    console.log("RegisterPage: loaded")

    const { onInputChange, name, surname, username, email, password, formState } = useForm(initialForm);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <div className="form-container animate__animated animate__fadeIn">
            <div className="form-container__info">
                <h1>social-network</h1>
                <p>social-network te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>

            <form onSubmit={ onSubmit } className="form-container__form">
                <div className="fullname-field">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Nombre" 
                        name="name"
                        value={ name }
                        onChange={ onInputChange }
                    />
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Apellidos" 
                        name="surname"
                        value={ surname }
                        onChange={ onInputChange }
                    />
                </div>

                <input 
                    className="form-control mb-6" 
                    type="text" 
                    placeholder="Nombre de usuario" 
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                />
                <input 
                    className="form-control mb-6" 
                    type="email" 
                    placeholder="Correo electrónico" 
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                />
                <input 
                    className="form-control mb-6" 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />

                <button 
                    className="btn btn-primary mb-0"
                    disabled={ isAuthenticating }    
                >
                    Crear cuenta
                </button>

                <hr/>
                <RouterLink className="btn btn-success" to="/auth/login">¿Ya tienes cuenta? <strong>Inicia sesión</strong></RouterLink>
            </form> 
        </div>
    )
}
