import jwt from 'jsonwebtoken';
import getConfig from 'next/config';

import { log } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

export const jwtSign = (
  payload: Object,
  keyName: 'access_token_private_key' | 'refresh_token_private_key',
  optionsName: 'access_token_sign_options' | 'refresh_token_sign_options'
) => {
  const privateKey = Buffer.from(
    serverRuntimeConfig[keyName],
    'base64'
  ).toString('ascii');

  const signOptions = serverRuntimeConfig[optionsName];

  try {
    return jwt.sign(payload, privateKey, signOptions);
  } catch (error) {
    log.error(error);
  }
};

export const jwtVerify = (
  token: string,
  keyName: 'access_token_public_key' | 'refresh_token_public_key'
) => {
  const publicKey = Buffer.from(
    serverRuntimeConfig[keyName],
    'base64'
  ).toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    log.error(error.message);
    // it will always return valid === false
    // if error message === jwt expired it will also return expire === false
    // the refresh token will be valid for refreshing the access token
    // only if the token is expired, not invalid like malformed
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};
