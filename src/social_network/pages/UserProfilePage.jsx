import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from '../../helpers/getUserById';
import { NavBar, Post } from '../components';
import '../../styles/social_network/YourProfilePage.css';

export const UserProfilePage = () => {
    const [UserData, setUserData] = useState(false);
    const { uid } = useParams();

    const user = useMemo(() => getUserById(uid), [uid]);

    user.then((value) => setUserData(value[0]));

    const dateString = useMemo(() => {
        const newDate = new Date(UserData.created_time);

        return newDate.toLocaleTimeString('es-AR', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    }, [UserData.created_time]);

    return (
        <>  
            <NavBar />
            {/*UserData.email*/}
            <div className="profile-container animate__animated animate__fadeIn animate__slow">
                <div className="profile-container__info">
                    <div className="profile-img-container">
                        <img className="profile-img" src={ UserData.photoURL }/>
                    </div>

                    <h3 className="profile-name">{UserData.name + ' ' + UserData.surname}</h3>
                    <p className="profile-username">@{ UserData.username }</p>
                    <hr/>

                    <p className='text-start ms-3'>{UserData.name } está en <strong className="text-primary">social-network </strong>desde: <strong>{ dateString }</strong></p>

                    <div className='text-start d-flex align-items-center'>
                        <i className="bi bi-envelope-check me-3 ms-3 fs-5 "></i><a href={`mailto:${UserData.email}`}>{ UserData.email }</a>
                    </div>

                    {
                        (UserData.address) &&
                        <div className="text-start d-flex align-items-center mt-1">
                            <i className="bi bi-house me-3 ms-3 fs-5"></i>{ UserData.address }
                        </div>
                    }       
                    {
                        (UserData.birthdate) &&
                        <div className="text-start d-flex align-items-center mt-1">
                            <i className="bi bi-calendar-date me-3 ms-3 fs-5"></i>{ UserData.birthdate }
                        </div>
                    }
                    <hr />
                </div>
            </div>

            <div className="profile-container animate__animated animate__fadeIn">
                <h2>Sus publicaciones</h2>

                <hr />

                <div className="profile-container__info">

                    {
                        (UserData.posts) &&
                            (UserData.posts).map(post => (
                                <Post key={ post.id } moreData={ [UserData.photoURL, UserData.username] } { ...post } />
                            ))
                    }
                </div>
            </div>
        </>
    )
}
