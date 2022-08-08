import { useMemo } from "react";
import { useSelector } from "react-redux";
import '../../styles/social_network/Post.css'

export const Post = ({ title, desc, photoURL: photo_url, date, id }) => {

    const { username, photoURL } = useSelector(state => state.auth);

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toLocaleTimeString('es-AR', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    }, [date]);

    return (
        <>
            <div className="post-account">
                <img className="container__small-photo" src={ photoURL }/>@<strong>{ username }</strong>
                <p className="container__published-text">El {dateString}.</p>
            </div>

            <div className="post-body">
                <h4>{ title }</h4>
                <p>{ desc }</p>
                {
                    photo_url.map(photo => {
                        return <img key={ photo } className="post-body__image" src={ photo } />
                    })
                }
                <div className="post-buttons">
                    <button className="btn btn-outline-success me-3" ><i className="bi bi-heart-fill"></i></button>
                    <button className="btn btn-outline-secondary" ><i className="bi bi-chat-text-fill"></i></button>
                    

                </div>
            </div>
            
            <hr/>
        </>
    )
}
