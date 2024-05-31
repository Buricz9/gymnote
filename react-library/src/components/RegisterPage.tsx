// RegisterPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from './Toolbar';
import './styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Tutaj dodaj logikę rejestracji użytkownika
        console.log('Rejestracja użytkownika:');
        console.log('Imię:', firstName);
        console.log('Nazwisko:', lastName);
        console.log('Email:', email);
        console.log('Hasło:', password);
        console.log('Typ użytkownika:', userType);
    };

    return (
        <>
            <Toolbar />
            <div className="register-container">
                <h2>Rejestracja użytkownika</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Imię</label>
                        <input
                            type="text"
                            placeholder="Wprowadź imię"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nazwisko</label>
                        <input
                            type="text"
                            placeholder="Wprowadź nazwisko"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Adres e-mail</label>
                        <input
                            type="email"
                            placeholder="Wprowadź adres e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Hasło</label>
                        <input
                            type="password"
                            placeholder="Wprowadź hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Typ użytkownika</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="">Wybierz typ użytkownika</option>
                            <option value="regular">Zwykły użytkownik</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                    <button type="submit" className="register-btn">Zarejestruj się</button>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
