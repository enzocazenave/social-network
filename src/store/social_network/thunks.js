import {setProfileImage} from '../auth/';
import { fileUpload } from '../../helpers/fileUpload';
import { FirebaseDB } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore/lite';
import Swal from 'sweetalert2';
import { setProfileInfo } from './social_networkSlice';

export const startUploadingProfileImage = (files = []) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const photoURL = await fileUpload(files[0]);

        dispatch(setProfileImage({ url: photoURL }));

        const newImage = {photoURL: photoURL};
        const docRef = doc(FirebaseDB, `${uid}/user_info`);

        await updateDoc(docRef, newImage, { merge: true });

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