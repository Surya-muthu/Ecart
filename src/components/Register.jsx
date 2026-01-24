import React from "react";

export default function Register({
  registerData,
  onChange,
  onRegister,
  switchToLogin,
}) {
  return (
    <>
      {/* MAIN TITLE */}
      <div className="title">Sign Up</div>

      {/* SUBTITLE (TEXT ONLY, NOT CLICKABLE) */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "17px",
          opacity: 0.85,
        }}
      >
        Create your account
      </div>

      <input
        name="username"
        placeholder="Username"
        value={registerData.username}
        onChange={onChange}
      />

      <input
        name="email"
        placeholder="Email address"
        value={registerData.email}
        onChange={onChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={registerData.password}
        onChange={onChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={registerData.confirmPassword}
        onChange={onChange}
      />

      <button onClick={onRegister}>Create Account</button>

      {/* BOTTOM LOGIN LINK */}
      <div className="switch" onClick={switchToLogin}>
        Already have an account? <b>Sign in</b>
      </div>
    </>
  );
}
