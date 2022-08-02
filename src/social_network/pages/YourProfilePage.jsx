import { NavBar } from '../components';
import { useSelector } from 'react-redux';
import '../../styles/social_network/YourProfilePage.css';
import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startUploadingProfileImage, startUploadingNewInfo } from '../../store/social_network/';
import { useForm } from '../../hooks/useForm';

const initialForm = {
    location: '',
    birthday: ''
}

export const YourProfilePage = () => {
    const { photoURL, name, surname, username, created_time, email } = useSelector(state => state.auth);
    const { address, birthdate } = useSelector(state => state.social_network);
    const [ showAddInfoModal, setShowAddInfoModal] = useState(false);
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const { location, birthday, onInputChange } = useForm(initialForm);

    const dispatch = useDispatch();
    const fileInputRef = useRef();

    const onFileInputChange = ({ target }) => {
        if (target.files == 0) return;

        dispatch(startUploadingProfileImage(target.files));
    }

    const dateString = useMemo(() => {
        const newDate = new Date(created_time);

        return newDate.toLocaleTimeString('es-AR', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    }, [created_time]);

    const onSetNewInfo = () => {
        const info = {
            location: null,
            birthday: null
        };

        if (location.length > 0) {
            info.location = location;
        } 

        if (birthday.length > 0) {
            info.birthday = birthday;
        }

        if (!info.location && !info.birthday) return;
        
        dispatch(startUploadingNewInfo(info , true));
        setShowAddInfoModal(false);
    }

    const onEditInfo = () => {
        const info = {
            location: null,
            birthday: null
        };

        if (location.length > 0) {
            info.location = location;
        } 

        if (birthday.length > 0) {
            info.birthday = birthday;
        }

        if (!info.location && !info.birthday) return;
        
        dispatch(startUploadingNewInfo(info, false));
        setShowEditInfoModal(false);
    }

    return (
        <>
            <NavBar/>

            <input 
                style={{ display: 'none' }}
                type="file" 
                onChange={ onFileInputChange }
                ref={ fileInputRef }
                accept="image/*"
            />

            <div className="profile-container animate__animated animate__fadeIn">
                <h2>Tu perfil</h2>

                <hr />

                <div className="profile-container__info">
                    {
                        (photoURL)
                        ? 
                            <div className="profile-img-container">
                                <img className="profile-img" src={ photoURL }/>
                                <i onClick={ () => fileInputRef.current.click() } className="bi bi-camera-fill profile-change-img fs-1"></i>
                            </div>
                        : 
                            <div className="profile-img-container">
                                <img className="profile-img" src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"/>
                                <i onClick={ () => fileInputRef.current.click() } className="bi bi-camera-fill profile-change-img fs-1"></i>            
                            </div>
                    }

                    <h3 className="profile-name">{name + ' ' + surname}</h3>
                    <p className="profile-username">@{ username }</p>
                    <hr/>

                    <p className='text-start ms-3'>{name} está en <strong className="text-primary">social-network </strong>desde: <strong>{ dateString }</strong></p>

                    <div className='text-start d-flex align-items-center'>
                        <i className="bi bi-envelope-check me-3 ms-3 fs-5 "></i><a href={`mailto:${email}`}>{ email }</a>
                    </div>

                    {
                        (address) &&
                        <div className="text-start d-flex align-items-center mt-1">
                            <i className="bi bi-house me-3 ms-3 fs-5"></i>{ address }
                        </div>
                    }       
                    {
                        (birthdate) &&
                        <div className="text-start d-flex align-items-center mt-1">
                            <i className="bi bi-calendar-date me-3 ms-3 fs-5"></i>{ birthdate }
                        </div>
                    }

                    <div className={`modal modal-backdrop ${ (showAddInfoModal) && 'd-block' } animate__animated animate__fadeIn animate__faster`}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Agregar información</h5>
                                    <button onClick={ () => setShowAddInfoModal(false) }  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        {
                                            (!address) &&
                                            <div className="mb-3 text-start">
                                                <label className="mb-1">¿Donde vives?</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ej: Buenos Aires"
                                                    name="location"
                                                    value={ location }
                                                    onChange={ onInputChange }
                                                />
                                            </div>
                                        }
                                        {
                                            (!birthdate) &&
                                            <div className="mb-3 text-start">
                                                <label className="mb-1">Fecha de nacimiento:</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control" 
                                                    name="birthday"
                                                    value={ birthday }
                                                    onChange={ onInputChange }
                                                />
                                            </div>
                                        }
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={ () => setShowAddInfoModal(false) } type="button" className="btn btn-secondary">Cerrar</button>
                                    <button onClick={ onSetNewInfo } type="button" className="btn btn-primary">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        (address && birthdate) &&
                        <div className="text-start ms-3">
                            <button onClick={ () => setShowEditInfoModal(true) } className="btn-sm btn btn-secondary mt-3"><i className="bi bi-pencil me-2"></i>Editar información</button>
                        </div>
                    }

                    <hr />

                    {
                        (!address || !birthdate) && 
                        <>
                            <p>Vemos que  falta información sobre usted. ¿Quieres que la gente sepa más sobre ti?</p>
                            <i className="bi bi-arrow-down-left fs-4 m-3"></i>
                            <i className="bi bi-arrow-down-right fs-4 m-3"></i>
                        
                            <button onClick={ () => setShowAddInfoModal(true) } className="container-fluid btn btn-primary mt-3">Agregar información</button>
                        </>
                    }

                    <div className={`modal modal-backdrop ${ (showEditInfoModal) && 'd-block' } animate__animated animate__fadeIn animate__faster`}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Editar información</h5>
                                    <button onClick={ () => setShowEditInfoModal(false) }  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3 text-start">
                                            <label className="mb-1">¿Donde vives?</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder={ address }
                                                name="location"
                                                value={ location }
                                                onChange={ onInputChange }
                                            />
                                        </div>                                        
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={ () => setShowEditInfoModal(false) } type="button" className="btn btn-secondary">Cerrar</button>
                                    <button onClick={ onEditInfo } type="button" className="btn btn-primary">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>   
    )
}
