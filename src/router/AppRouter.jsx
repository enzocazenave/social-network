import { Routes, Route, Navigate } from 'react-router-dom';
import { SocialNetworkRoutes } from '../social_network/routes/SocialNetworkRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRouter = () => {

    const status = 'non';

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
