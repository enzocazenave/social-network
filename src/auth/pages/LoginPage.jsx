import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/';
import '../../styles/auth/auth.css';

import { startLoginWithEmailPassword } from '../../store/auth';


const initialForm = {
    email: '',
    password: ''
} 

export const LoginPage = () => {
    
    const {status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const { onInputChange, email, password, formState } = useForm(initialForm);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ 
            email, 
            password 
        }));
    }

    return (
        <div className="form-container animate__animated animate__fadeIn">
            <div className="form-container__info">
                <h1>social-network</h1>
                <p>social-network te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.</p>
            </div>

            <form 
                onSubmit={ onSubmit } 
                className="form-container__form"
            >
                <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Correo electrónico" 
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                />
                <input 
                    className="form-control" 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />

                <button 
                    className="btn btn-primary"
                    disabled={ isAuthenticating }
                >
                    Iniciar sesión
                </button>
                <RouterLink className="change-password-redirect" to="/auth/change">¿Has olvidado la contraseña?</RouterLink>

                <hr/>

                <RouterLink className="btn btn-success" to="/auth/register">¿No tienes cuenta? <strong>Crea una</strong></RouterLink>
            </form> 
        </div>
    )
}
