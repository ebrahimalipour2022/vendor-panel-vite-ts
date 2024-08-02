import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { ITokenData } from '@/types';
import { umAxiosInstance, vendorAxiosInstance } from '@/redux/api';
import axios from 'axios';

const chunkSize = 4000; // Adjust chunk size as needed
const VITE_COOKIES_SECRET_KEY = process.env.VITE_COOKIES_SECRET_KEY;
const VITE_COOKIES_EXPIRES = process.env.VITE_COOKIES_EXPIRES;

const encryptTokens = (tokenData: ITokenData): string | null => {
  if (tokenData) {
    return CryptoJS.AES.encrypt(JSON.stringify(tokenData), VITE_COOKIES_SECRET_KEY!).toString();
  }
  return null;
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
  try {
    if (!encryptedData) return null;
    const chunks: string[] | null =
      chunkSize > 0
        ? encryptedData.match(new RegExp('.{1,' + chunkSize + '}', 'g'))
        : [encryptedData];

    if (chunks?.length) {
      chunks.forEach((chunk, index) => {
        Cookies.set(`token_chunk_${index}`, chunk, { expires: Number(VITE_COOKIES_EXPIRES) }); // Adjust expiration as needed
      });
    }
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
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

const setTokens = (tokenObj: ITokenData) => {
  if (tokenObj?.access_token) {
    axios.defaults.headers.Authorization = 'Bearer ' + tokenObj.access_token;
    vendorAxiosInstance.defaults.headers.Authorization = 'Bearer ' + tokenObj.access_token;
    umAxiosInstance.defaults.headers.Authorization = 'Bearer ' + tokenObj.access_token;
    const encryptedData = encryptTokens(tokenObj);
    if (encryptedData) {
      storeEncryptedTokens(encryptedData);
    } else {
      logout();
    }
  } else {
    logout();
  }
};

const getTokens = (): ITokenData => {
  const encryptedData = getEncryptedTokens();
  if (!encryptedData) return { access_token: '', refresh_token: '', token_type: '', expires_in: 0 };
  return <ITokenData>decryptTokens(encryptedData);
};

const logout = () => {
  // remove all axios authorization header
  delete axios.defaults.headers.Authorization;
  delete vendorAxiosInstance.defaults.headers.Authorization;
  delete umAxiosInstance.defaults.headers.Authorization;
  // remove all token chunk cookies
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
