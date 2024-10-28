import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/sso-login`;
  };
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Azure</button>
    </div>
  );
};
export default Login;
