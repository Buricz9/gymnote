// components/Toolbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Toolbar.css';
import { jwtDecode } from 'jwt-decode';

interface ToolbarProps {
    history?: any; // Opcjonalnie typ historii przeglądarki
}

const getRole = (): String | null => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.sub) {
            return decodedToken.role;
        }
        return null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

const Toolbar: React.FC<ToolbarProps> = ({ history }) => {
    // const userType = localStorage.getItem('userType');
    const userType = getRole();
    const handleLogout = () => {
        console.log('hist' + history);
    };

    return (
        <div className="toolbar">
            {userType == 'MANAGER' && (
                <Link to="/registration" className="toolbar-link">
                    Rejestracja
                </Link>
            )}
            {(userType == 'MANAGER' || userType === 'ADMIN') && (
                <Link to="/create-plan" className="toolbar-link">
                    Utwórz plan
                </Link>
            )}
            {(userType === 'MANAGER' || userType === 'ADMIN') && (
                <Link to="/select-plan" className="toolbar-link">
                    Wybierz plan
                </Link>
            )}
            {(userType === 'MANAGER' || userType === 'ADMIN') && (
                <Link to="/dodaj-cwiczenie" className="toolbar-link">
                    Dodaj ćwiczenie
                </Link>
            )}
            {(userType === 'MANAGER' || userType === 'ADMIN') && (
                <Link to="/details" className="toolbar-link">
                    Wyświetl ćwiczenia
                </Link>
            )}
        </div>
    );
};

export default Toolbar;
