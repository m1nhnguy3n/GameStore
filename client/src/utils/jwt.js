/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
import { sign, verify } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const isValidRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  const decoded = jwtDecode(refreshToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

// ----------------------------------------------------------------------

const setAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(refreshToken);
    // // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('refreshToken');
  }
};


export { isValidToken, setAccessToken, setRefreshToken, isValidRefreshToken, verify, sign };
