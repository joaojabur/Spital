import { Fragment, useState, useEffect, useContext } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";
import Loader from "react-loader-spinner";
import api from "../../services/api";
import Cookies from "js-cookie";
import DataContext from "../../context/DataContext";

const LoginSpitalAccount = () => {
  const { loggedUser, setLoggedUser } = useContext(DataContext);

  console.log(loggedUser);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const [error, setError] = useState("");

  async function handleSubmitLogin(e: any) {
    e.preventDefault();

    await api
      .post("/clients/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        Cookies.set("access-token", response.data.token, {
          expires: 7,
        });

        setError("");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Fragment>
      {isLoading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <Fragment>
          <div className="header-login">
            <div className="container header-context">
              <Link className="return-link" to={`/entrar-paciente`}>
                <img src={returnIcon} alt="Retornar" className="return" />
              </Link>
              <div className="header-title">
                <h1>
                  Insira suas informações para que a gente consiga realizar seu
                  cadastro
                </h1>
              </div>
              <img className="logo" src={logo} alt="Spital" />
            </div>
          </div>
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
                    <span>
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
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

                <button onClick={handleSubmitLogin} className="login-button">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSpitalAccount;
