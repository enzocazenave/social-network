import { doc, getDocs, collection } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const getUserById = async(uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    const userRef = collection(FirebaseDB, uid);
    const userGet = await getDocs(userRef);
    
    const user = [];

    userGet.forEach(value => {
        user.push({ ...value.data() });
    })

    return user;
}


