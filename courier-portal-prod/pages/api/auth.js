import { promises as fs } from 'fs';
import path from 'path';

const TOKEN_FILE = path.join(process.cwd(), 'shiprocket_token.json');

const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL || 'devanshu.s@outlook.com';
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD || '0p!S$&F868bNZ6ch';

async function storeToken(token) {
  await fs.writeFile(TOKEN_FILE, JSON.stringify({ token, timestamp: Date.now() }));
}

async function getStoredToken() {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf8');
    const { token, timestamp } = JSON.parse(data);
    // Tokens are valid for 10 days (240 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp < TEN_DAYS_IN_MS) {
      return token;
    }
  } catch (error) {
    // File not found or invalid JSON, proceed to generate new token
  }
  return null;
}

export async function getAuthToken() {
  let token = await getStoredToken();

  if (!token) {
    console.log('Generating new Shiprocket token...');
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      token = data.token;
      await storeToken(token);
      console.log('New Shiprocket token generated and stored.');
    } else {
      throw new Error(`Failed to get Shiprocket token: ${data.message || response.statusText}`);
    }
  }
  return token;
}