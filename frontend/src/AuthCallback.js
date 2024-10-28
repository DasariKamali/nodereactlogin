import React, { useEffect } from 'react';

const AuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/exchange-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.accessToken);
        })
        .catch(error => console.error('Error:', error));
    }
  }, []);
  return <div>Handling Authentication Callback...</div>;
};
export default AuthCallback;
