import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { loadUserInfo } from '../../helpers/loadUserInfo';
import { setProfileInfo } from '../social_network';
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
        
        dispatch(login({
            uid,
            ...userInfo[0]
        }));

        console.log(userInfo[0])

        dispatch(setProfileInfo({
            birthdate: userInfo[0].birthdate,
            address: userInfo[0].address
        }))
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
            photoURL: photoURL,
            created_time: date,
            birthdate: null,
            address: null
        }

        const newDoc = doc(FirebaseDB, `${uid}/user_info`)
        await setDoc(newDoc, user_info);

        dispatch(login({ uid, email, name, surname, username, photoURL, created_time: date }, {merge: true}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}