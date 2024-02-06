// src/components/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
