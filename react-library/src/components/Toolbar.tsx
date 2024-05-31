// Toolbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Toolbar.css';

const Toolbar: React.FC = () => {
    return (
        <div className="toolbar">
            <Link to="/registration" className="toolbar-link">
                Rejestracja
            </Link>
            <Link to="/create-plan" className="toolbar-link">
                Utwórz plan
            </Link>
            <Link to="/select-plan" className="toolbar-link">
                Wybierz plan
            </Link>
            {/* <Link to="/progress" className="toolbar-link">
                Postępy
            </Link> */}
        </div>
    );
};

export default Toolbar;
