import {setProfileImage} from '../auth/';
import { fileUpload } from '../../helpers/fileUpload';
import { FirebaseDB, FirebaseRTDB } from '../../firebase/config';
import { doc, updateDoc, collection, setDoc } from 'firebase/firestore/lite';
import Swal from 'sweetalert2';
import { setPosts, setProfileInfo } from './social_networkSlice';
import { loadUserPosts } from '../../helpers/loadUserPosts';
import { ref, set, get } from 'firebase/database';

export const startUploadingProfileImage = (files = []) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const photoURL = await fileUpload(files[0]);

        dispatch(setProfileImage({ url: photoURL }));

        const newImage = {photoURL: photoURL};
        const docRef = doc(FirebaseDB, `${uid}/user_info`);

        await updateDoc(docRef, newImage, { merge: true });

        dispatch(setDatabaseUserInfo())

        Swal.fire('Imagen subida', 'Tu foto de perfil fue actualizada.', 'success');

    }
}

export const startUploadingNewInfo = (info = [], both) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        var newDate = null;

        if (info.birthday) {
            const date = info.birthday;
            const splitDate = date.split("-");
            newDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
        }

        if (both) {
            dispatch(setProfileInfo({
                address: info.location,
                birthdate: newDate
            }));

            const newInfo = {birthdate: newDate, address: info.location};
            const docRef = doc(FirebaseDB, `${uid}/user_info`);

            await updateDoc(docRef, newInfo, { merge: true });
        } else {
            const { birthdate } = getState().social_network;
            
            dispatch(setProfileInfo({
                birthdate: birthdate,
                address: info.location,
            }));

            const newInfo = { birthdate, address: info.location };
            const docRef = doc(FirebaseDB, `${uid}/user_info`);

            await updateDoc(docRef, newInfo, { merge: true });
        }

        Swal.fire('Información actualizada', '', 'success');
    }
}

export const startUploadingNewPost = (title, desc, files = []) => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;
        const userPosts = await loadUserPosts(uid);
    
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);

        const newPost = {
            title,
            desc,
            photoURL: photoUrls,
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/user_posts/posts`));
        await setDoc(newDoc, newPost);

        newPost.id = newDoc.id;

        userPosts.push(newPost);

        dispatch(setPosts(userPosts));
        dispatch(setDatabaseUserInfo())
    
        Swal.fire('Publicación subida', '', 'success');
    }
}

export const setDatabaseUserInfo = () => {
    return async(dispatch, getState) => {
        const { uid, username, photoURL, name, surname } = getState().auth;
        const { posts } = getState().social_network;

        await set(ref(FirebaseRTDB, `users/${uid}`), {
            username: username, photoURL: photoURL, name: `${name} ${surname}`
        })
    }
}
