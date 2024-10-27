import React from 'react';

const Login = () => {
  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      response_mode: 'query',
      scope: 'https://graph.microsoft.com/.default offline_access',
    });

    const loginUrl = `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
    window.location.href = loginUrl;
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Azure</button>
    </div>
  );
};

export default Login;
