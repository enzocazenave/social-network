import { Routes, Route, Navigate } from 'react-router-dom';
import { FeedPage, SearchedUsersPage, YourProfilePage } from '../pages/';

export const SocialNetworkRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <FeedPage /> } />
            <Route path="/profile" element={ <YourProfilePage /> } /> 
            <Route path="/*" element={ <Navigate to="/" /> } />
            <Route path="/search" element={ <SearchedUsersPage /> } />
        </Routes>
    )
}