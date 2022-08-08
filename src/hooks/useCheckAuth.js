import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { networkLogout, setProfileInfo } from '../store/social_network';
import { useEffect } from 'react';
import { loadUserInfo } from '../helpers/loadUserInfo';
import { loadUserPosts } from '../helpers/loadUserPosts';
import { setPosts } from '../store/social_network';


export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) {
                dispatch(logout());
                dispatch(networkLogout());
                return ;
            }

            const { uid } = user;

            const userInfo = await loadUserInfo(uid);
            const userPosts = await loadUserPosts(uid);

            dispatch(login({
                uid,
                ...userInfo[0]
            }));
            
            dispatch(setProfileInfo({
                address: (userInfo[0]) ? userInfo[0].address : null,
                birthdate: (userInfo[0]) ? userInfo[0].birthdate : null,
            }));        

            dispatch(setPosts(userPosts));
        });
    }, []);

    return status;
}