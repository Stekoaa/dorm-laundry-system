import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import React from 'react';
import { Navbar } from "../navigation/Navbar";

interface RequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();



    return (
        user?.roles?.map(role => role.authority).find(role => allowedRoles?.includes(role))
            ? (
                <>
                    <Navbar/>
                    <Outlet/>
                </>
            )
            : user
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    );
};
