import React, { useState } from 'react';
import Toolbar from './Toolbar';
import axios from 'axios';
import './styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            userName,
            email,
            password,
            userType
        };

        try {
            const response = await axios.post('http://localhost:8080/users/register', user);
            if (response.status === 200) {
                setMessage('Rejestracja zakończona sukcesem');
            }
        } catch (error: any) {
            if (error.response) {
                setMessage(`Rejestracja nie powiodła się: ${error.response.data}`);
            } else {
                setMessage('Błąd podczas rejestracji: ' + error.message);
            }
        }
    };

    return (
        <div className="register-plan-page">
            <Toolbar />
            <div className="register-container">
                <h2>Rejestracja użytkownika</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa użytkownika</label>
                        <input
                            type="text"
                            placeholder="Wprowadź nazwe użytkownika"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                            <option value="USER">Zwykły użytkownik</option>
                            <option value="ADMIN">Administrator</option>
                            <option value="MENAGER">Menager</option>
                        </select>
                    </div>
                    <button type="submit" className="register-btn">Zarejestruj się</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
