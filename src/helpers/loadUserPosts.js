import { getDocs, collection } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadUserPosts = async(uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/user_posts/posts`);
    const postsGet = await getDocs(collectionRef);
    
    const posts = [];

    postsGet.forEach(post => {
        posts.push({
            id: post.id,
            ...post.data()
        });  
    })

    return posts;
}


