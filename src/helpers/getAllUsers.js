import { child, get, ref } from 'firebase/database';
import { FirebaseRTDB } from '../firebase/config';

export const getAllUsers = async() => {
    const dbref = ref(FirebaseRTDB);
    const result = [];

    await get(child(dbref, 'users')).then((snapshot) => {
        if (snapshot.exists()) {   
            const plainResult = snapshot.val();

            const mappedResult = Object.keys(plainResult).map(key => {
                result.push({
                    uid: key,
                    username: plainResult[key]['username'],
                    photoURL: plainResult[key]['photoURL'],
                    name: plainResult[key]['name'],
                })
            })
        }
    })

    return result;
}