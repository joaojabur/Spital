import React, { useState } from 'react'
import { IconButton, TextField} from "@material-ui/core";
import { useHistory } from 'react-router'
import MainHeader from '../../components/MainHeader'
import { useAuth } from '../../context/AuthProvider';
import { useModal } from '../../context/ModalProvider';
import { Link } from 'react-router-dom';

import './style.css';

export default function LoginPage() {
    let history = useHistory();

    const { spinner } = useModal();
    const { login } = useAuth();
    const [user, setUser] = useState({
    email: "",
    password: "",
    });

    const [error, setError] = useState("");

    async function handleSubmitLogin(e: any) {
    e.preventDefault();
    spinner.open();

    const { error } = await login(user.email, user.password);

    spinner.close();
    setError(error);
    }

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    function handleShowPassword() {
    setShowPassword(!showPassword);
}

    return (
        <div className="login-spital-account-container">
            <MainHeader 
                title="Insira suas informações para que consigamos realizar o seu cadastro" 
                returnFunction={() => { history.push('/')}}/>
             <div className="login-spital-account">
                <div className="login-spital-account-credentials">
                <form className="login-spital-account-form">
                    <div className="login-spital-account-form-flex">
                    <h2>Entre com seu e-mail e senha</h2>

                    <IconButton
                        onClick={() => {
                        handleShowPassword();
                        }}
                        color="primary"
                    >
                        <span>{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                    </IconButton>
                    </div>
                    <div className="gray-line"></div>

                    <div className="login-spital-account-form-inputs">
                    <TextField
                        type="email"
                        value={user.email}
                        fullWidth
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                        variant="outlined"
                        label={<span style={{ fontSize: "1.5rem" }}>E-mail</span>}
                        placeholder="Digite seu e-mail"
                    />

                    <TextField
                        value={user.password}
                        style={{ marginTop: "2rem" }}
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                        }}
                        variant="outlined"
                        label={<span style={{ fontSize: "1.5rem" }}>Senha</span>}
                        placeholder="Digite sua senha"
                    />
                    </div>

                    <p
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "red",
                        position: "relative",
                        top: "-10px",
                    }}
                    >
                        {error}
                    </p>

                    <div className="gray-line" id="gray-line-2"></div>
                    <Link
                        style={{
                            color: "#07B3D6",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginTop: "1.5rem",
                        }}
                        to="/recuperar"
                        >
                        Esqueci minha senha
                    </Link>

                    <button onClick={handleSubmitLogin} className="login-button">
                        Entrar
                    </button>
                </form>
                </div>
            </div>
        </div>
    )
}
