import React from 'react'
import { Navigate } from 'react-router-dom';
import { cookies } from '../../service/Cookies';

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
    const isLoggedIn: boolean = cookies.get("isLogged");

    return  isLoggedIn? <>{element}</> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;