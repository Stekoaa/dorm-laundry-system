import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import React from 'react';

interface RequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    return (
        user?.roles?.map(role=>role.authority).find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    );
};
