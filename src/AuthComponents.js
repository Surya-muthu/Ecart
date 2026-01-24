// AuthComponents.js
import React, { useContext } from "react";
import { AppContext } from "./AppContext"; // context file

export const Login = () => {
  const { loginData, handleLoginChange, login, setPage } = useContext(AppContext);
  return (
    <>
      <div className="title">Account Login</div>
      <input
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleLoginChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleLoginChange}
      />
      <button onClick={login}>SIGN IN</button>
      <div className="switch" onClick={() => setPage("register")}>Sign Up</div>
    </>
  );
};

export const Register = () => {
  const { registerData, handleRegisterChange, register, setPage } = useContext(AppContext);
  return (
    <>
      <div className="title">Sign Up</div>
      <input
        name="username"
        placeholder="Username"
        value={registerData.username}
        onChange={handleRegisterChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={registerData.email}
        onChange={handleRegisterChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={registerData.password}
        onChange={handleRegisterChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={registerData.confirmPassword}
        onChange={handleRegisterChange}
      />
      <button onClick={register}>Create Account</button>
      <div className="switch" onClick={() => setPage("login")}>
        Already have an account? Sign in
      </div>
    </>
  );
};
