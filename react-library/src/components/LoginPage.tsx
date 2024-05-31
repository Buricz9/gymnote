// components/LoginPage.tsx
import React, { useState } from 'react';
import './styles/LoginPage.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [isLoggedInn, setIsLoggedInn] = useState(false);
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         password: '',
    //         isLoggedIn: false
    //     };
    // }



    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const { email, password } = this.state;
        const email = login;
        const password = passwordd;
        const isLoggedIn = isLoggedInn;

        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                email,
                password
            });


            localStorage.setItem('token', response.data.token);

            setIsLoggedInn(true);
            console.log(email, password, isLoggedIn, response.data.token)
        } catch (error) {
            alert('Incorrect email or password.');
        }
    };

    if (isLoggedInn) {
        return (
            <Navigate to="/create-plan" />
        )
    } {


        return (
            <div className="login-container">
                <div className="login-form">
                    <h2>Logowanie na siłownię</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Login</label>
                            <input
                                type="text"
                                placeholder="Wprowadź login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Hasło</label>
                            <input
                                type="password"
                                placeholder="Wprowadź hasło"
                                value={passwordd}
                                onChange={(e) => setPasswordd(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Zaloguj
                        </button>

                    </form>
                </div>
            </div>
        );
    }
};

export default LoginPage;
