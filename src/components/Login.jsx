import Reinsrted of thaht   

  const { loginData, handleLoginChange, login, setPage } = useContext(AppContext);
 use this as login input and give me a sigle page copy paste ogf this  u can im[port from ./ app.Context 
  act from "react";

export default function Login({
  loginData,
  onChange,
  onLogin,
  switchToRegister, 
  

}) {
  return (
    <>
      {/* TITLE */}
      <div className="title" style={{ textAlign: "center", marginBottom: "16px" ,fontSize:"16px" }}>
        Account Login
      </div>

      {/* SINGLE BOX CONTAINER */}
      <div
        style={{
          background: "#f0f2f5",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          overflow: "hidden", // makes sure no borders show gaps
        }}
      >
        {/* FIRST ROW: EMAIL + PASSWORD */}
        <div style={{ display: "flex" , }}>
          <input
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={onChange}
            style={{
           flex: 1,
              margin:"0",
              padding: "12px",
              paddingTop: "15px",
              border: "1px solid white",
              border: "none", // remove individual borders
              outline: "none",
              textAlign: "center", // center the placeholder text
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={onChange}
            style={{
              flex: 1,
              margin:"0",
              padding: "12px",
              paddingTop: "15px",
              border: "1px solid white", // remove individual borders
              outline: "none",
              textAlign: "center", // center the placeholder text
            }}
          />
        </div>

        {/* SECOND ROW: SIGN IN BUTTON */}
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#000000",
            color: "white",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* LINKS COLUMN */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1px",
          fontSize: "14px",
          gap: "8px",
        }}
      >
        <span
          className="switch"
          onClick={switchToRegister}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          Sign Up
        </span>

        <span style={{ opacity: 0.8, cursor: "pointer" }}>Forgot Password?</span>
      </div>

      {/* FORGOT PASSWORD SECTION (UI ONLY) */}
      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Forgot Your Password
        </div>

        <div
          style={{
            fontSize: "13px",
            opacity: 0.8,
            marginBottom: "12px",
          }}
        >
          We'll email you instructions on how to reset your password
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            textAlign: "center", // center the placeholder text
          }}
        />

        <button style={{ width: "100%", padding: "12px" ,background:"blue"}}>
          Reset Password →
        </button>
      </div>
    </>
  );
}
