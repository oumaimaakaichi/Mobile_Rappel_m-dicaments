import React, { useState } from "react";
import "./form7.css";
import { useSpring, animated } from "react-spring";
import { useNavigate } from 'react-router-dom';


function FormulaireEtu() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 2px #1059FF",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Connexion
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Inscription
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Mot de passe oublié</a>
      </animated.div>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" />
      <label for="password">Mot de passe</label>
      <input type="text" id="password" />
      <input type="submit" value="Connexion" className="submit" onClick={()=> {navigate('/EspaceEtudiant')}}/>
    </React.Fragment>
  );
}

function RegisterForm() {
  return (
    <React.Fragment>
      <label for="fullname">Nom</label>
      <input type="text" id="fullname" />
      <label for="email">email</label>
      <input type="text" id="email" />
      <label for="password">Mot de passe</label>
      <input type="text" id="password" />
      <label for="confirmpassword">Mot de passe confirmé</label>
      <input type="text" id="confirmpassword" />
      <input type="submit" value="Connexion" class="submit" />
    </React.Fragment>
  );
}

export default FormulaireEtu;