import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { loadUserInfo } from '../../helpers/loadUserInfo';
import { loadUserPosts } from '../../helpers/loadUserPosts';
import { networkLogout, setDatabaseUserInfo, setPosts, setProfileInfo, setSearchedUsers } from '../social_network';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        
        const {ok, uid, errorMessage } = await loginWithEmailPassword({ email, password });
    
        if (!ok) return dispatch(logout({ errorMessage }));

        const userInfo = await loadUserInfo(uid);
        const userPosts = await loadUserPosts(uid);
        
        dispatch(login({
            uid,
            ...userInfo[0]
        }));

        dispatch(setProfileInfo({
            birthdate: userInfo[0].birthdate,
            address: userInfo[0].address
        }));

        dispatch(setPosts(userPosts));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, username, name, surname }) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        const date = new Date().getTime();

        const user_info = {
            email: email,
            name: name,
            surname: surname,
            username: username,
            photoURL: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg",
            created_time: date,
            birthdate: null,
            address: null
        }

        const user_post = {
            title: 'Hola a todos!',
            desc: `Soy ${ name } y me uní a social-network`,
            photoURL: ['https://pbs.twimg.com/profile_images/808660555/logosmall-1_400x400.jpg'],
            date: new Date().getTime()
        };

        const newDoc = doc(FirebaseDB, `${uid}/user_info`);
        await setDoc(newDoc, user_info);

        const newDocTwo = doc(collection(FirebaseDB, `${uid}/user_posts/posts`));
        await setDoc(newDocTwo, user_post);

        user_post.id = newDocTwo.id;

        dispatch(setPosts([user_post]));

        dispatch(login({ uid, email, name, surname, username, photoURL: "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg", created_time: date }, {merge: true}));
        
        await dispatch(setDatabaseUserInfo());
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout());
        dispatch(networkLogout());
        dispatch(setSearchedUsers([]));
    }
}