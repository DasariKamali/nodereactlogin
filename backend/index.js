const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const tokenUrl = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

app.get('/api/auth/sso-login', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI,
    response_mode: 'query',
    scope: 'https://graph.microsoft.com/.default offline_access',
  });

  const loginUrl = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
  res.redirect(loginUrl);
});

app.post('/api/auth/exchange-token', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }
  try {
    const response = await axios.post(tokenUrl, new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      scope: 'https://graph.microsoft.com/.default',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
      client_secret: process.env.CLIENT_SECRET,
    }));
    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: `Error exchanging code: ${error.message}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
