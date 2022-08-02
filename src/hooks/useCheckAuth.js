import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { setProfileInfo } from '../store/social_network';
import { useEffect } from 'react';
import { loadUserInfo } from '../helpers/loadUserInfo';

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) return dispatch(logout());

            const { uid } = user;

            const userInfo = await loadUserInfo(uid);
        
            dispatch(login({
                uid,
                ...userInfo[0]
            }));

            dispatch(setProfileInfo({
                birthdate: userInfo[0].birthdate,
                address: userInfo[0].address
            }))
        });
    }, []);

    return status;
}