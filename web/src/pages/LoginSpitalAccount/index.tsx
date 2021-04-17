import { Fragment, useState, useEffect, useContext } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import DataContext from "../../context/DataContext";

import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import returnIcon from "../../assets/images/icons/return.svg";
import logo from "../../assets/images/logo.svg";
import Loader from "react-loader-spinner";
import api from "../../services/api";

const LoginSpitalAccount = () => {
  const { loggedUser, setLoggedUser } = useContext(DataContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const [error, setError] = useState("");

  function handleSubmitLogin(e: any) {
    e.preventDefault();

    api
      .post("/login-client", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.length === 0) {
          setError("E-mail e senha não combinam!");
        } else {
          console.log(response.data);
          setLoggedUser({
            ...loggedUser,
            email: response.data[0].email,
            password: response.data[0].password,
            firstName: response.data[0].first_name,
            lastName: response.data[0].last_name,
            phoneNumber: response.data[0].phoneNumber,
          });
          setError("");
          history.push("/test");
        }
      });
  }

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
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
