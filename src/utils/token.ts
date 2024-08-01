import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { ITokenData } from '@/types';

const chunkSize = 3000; // Adjust chunk size as needed
const VITE_COOKIES_SECRET_KEY = process.env.VITE_COOKIES_SECRET_KEY;
const VITE_COOKIES_EXPIRES = process.env.VITE_COOKIES_EXPIRES;

const encryptTokens = (tokens: ITokenData): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(tokens), VITE_COOKIES_SECRET_KEY!).toString();
};

const decryptTokens = (encryptedData: string): ITokenData | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, VITE_COOKIES_SECRET_KEY!);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Error decrypting tokens:', error);
    return null;
  }
};

const storeEncryptedTokens = (encryptedData: string) => {
  // Split encrypted data into chunks
  const chunks = [];
  for (let i = 0; i < encryptedData.length; i += chunkSize) {
    chunks.push(encryptedData.slice(i, chunkSize));
  }

  // Store chunks in cookies
  chunks.forEach((chunk, index) => {
    Cookies.set(`token_chunk_${index}`, chunk, { expires: Number(VITE_COOKIES_EXPIRES) }); // Adjust expiration as needed
  });
};

const getEncryptedTokens = (): string | null => {
  // Retrieve all token chunks
  const chunks: string[] = [];

  for (let i = 0; ; i++) {
    const chunk = Cookies.get(`token_chunk_${i}`);
    if (!chunk) break;
    chunks.push(chunk);
  }

  // Reconstruct encrypted data
  return chunks.length > 0 ? chunks.join('') : null;
};

const setTokens = (tokens: ITokenData) => {
  const encryptedData = encryptTokens(tokens);
  storeEncryptedTokens(encryptedData);
};

const getTokens = (): ITokenData | null => {
  const encryptedData = getEncryptedTokens();
  if (!encryptedData) return null;
  return <ITokenData>decryptTokens(encryptedData);
};

const logout = () => {
  for (let i = 0; ; i++) {
    const cookieName = `token_chunk_${i}`;
    const chunk = Cookies.get(cookieName);
    if (chunk) {
      Cookies.remove(cookieName);
    } else {
      window.location.replace('/');
      break;
    }
  }
};

export { setTokens, getTokens, logout };
