import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useClearAuthOnNavigation = () => {
    const location = useLocation();
    const { clearAuth } = useAuth();

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const username = pathSegments[pathSegments.length - 1];

        if (!username) {
            clearAuth();
        }
    }, [location, clearAuth]);
};

export default useClearAuthOnNavigation;
