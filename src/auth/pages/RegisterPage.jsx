import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import '../../styles/auth/auth.css';
import { useDispatch, useSelector } from 'react-redux/';
import { checkFirebaseError } from '../../helpers/checkFirebaseError';

const initialForm = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: ''
}

const formValidations = {
    name: [(value) => value.length >= 1, 'El nombre es obligatorio'],
    surname: [(value) => value.length >= 1, 'El apellido es obligatorio'],
    username: [(value) => value.length >= 4, 'El nombre de usuario es obligatorio'],
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length > 6, 'La contraseña debe tener más de 6 caracteres']
}

export const RegisterPage = () => {
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { 
        onInputChange, 
        name, surname, username, email, password, 
        formState ,
        nameValid, surnameValid, usernameValid, emailValid, passwordValid,
        isFormValid, 
    } = useForm(initialForm, formValidations);

    const {status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status === 'checking', [status]);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if (!isFormValid) return;

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
                        className={`form-control ${ (!!nameValid && formSubmitted) && 'is-invalid' }`} 
                        type="text" 
                        placeholder="Nombre" 
                        name="name"
                        value={ name }
                        onChange={ onInputChange }
                    />
                    <input 
                        className={`form-control ${ (!!surnameValid && formSubmitted) && 'is-invalid' }`} 
                        type="text" 
                        placeholder="Apellidos" 
                        name="surname"
                        value={ surname }
                        onChange={ onInputChange }
                    />
                </div>

                <input 
                    className={`form-control mb-6 ${ (!!usernameValid && formSubmitted) && 'is-invalid' }`} 
                    type="text" 
                    placeholder="Nombre de usuario" 
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                />
                <input 
                    className={`form-control mb-6 ${ (!!emailValid && formSubmitted) && 'is-invalid' }`} 
                    type="email" 
                    placeholder="Correo electrónico" 
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                />
                <input 
                    className={`form-control mb-6 ${ (!!passwordValid && formSubmitted) && 'is-invalid' }`} 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />
                {  
                    (formSubmitted) && 
                        <>
                            <div className="alert alert-danger p-2 text-start" role="alert" style={{display: `${!!passwordValid ? '': 'none'}`}}>
                                <i className="bi bi-info-circle me-2"></i>{ passwordValid }
                            </div>
                            <div className="alert alert-danger p-2 text-start" role="alert" style={{display: `${(!!usernameValid || !!nameValid || !!surnameValid) ? '': 'none'}`}}>
                                <i className="bi bi-info-circle me-2"></i>Todos los campos son obligatorios
                            </div>
                            <div className="alert alert-danger p-2 text-start" role="alert" style={{display: `${!!emailValid ? '': 'none'}`}}>
                                <i className="bi bi-info-circle me-2"></i>{ emailValid }
                            </div>
                        </>
                }

                <div className="alert alert-danger p-2 text-start" role="alert" style={{display: `${!!errorMessage ? '': 'none'}`}}>
                    <i className="bi bi-info-circle me-2"></i>{ checkFirebaseError(errorMessage) }
                </div>

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
