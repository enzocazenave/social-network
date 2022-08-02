import { Routes, Route, Navigate } from 'react-router-dom';
import { SocialNetworkRoutes } from '../social_network/routes/SocialNetworkRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks/';

export const AppRouter = () => {

    const status = useCheckAuth();
    
    if (status === 'checking') {
        return <CheckingAuth/>
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                ? <Route path="/*" element={ <SocialNetworkRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )
}
