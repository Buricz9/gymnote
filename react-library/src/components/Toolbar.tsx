// components/Toolbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Toolbar.css';

interface ToolbarProps {
    history?: any; // Opcjonalnie typ historii przeglądarki
}

const Toolbar: React.FC<ToolbarProps> = ({ history }) => {
    const userType = localStorage.getItem('userType');

    const handleLogout = () => {
        console.log('hist' + history);
    };

    return (
        <div className="toolbar">
            {userType === 'MANAGER' && (
                <Link to="/registration" className="toolbar-link">
                    Rejestracja
                </Link>
            )}
            {(userType === 'MANAGER' || userType === 'ADMIN') && (
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
        </div>
    );
};

export default Toolbar;
