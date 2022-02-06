import { NextApiRequest, NextApiResponse } from 'next';
import { authServices } from 'services';
import { jwtVerify, apiHandler, setCookie } from 'helpers/api';

// receives user info from headers or cookies and returns the user
const deserializeUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the access token from the cookies or authorization header
  const accessToken = req.cookies.accessToken;

  // get the refresh token from the cookies or x-refresh header
  const refreshToken = req.cookies.refreshToken;

  // check if there is any access token
  if (!refreshToken) {
    throw { ...Error, name: 'UnauthorizedError' };
  }

  const { decoded, expired } = jwtVerify(
    accessToken,
    'access_token_public_key'
  );

  // check if the access token is expired and if the refresh token is present
  if (refreshToken && !decoded) {
    // reissue access token if the refresh token is valid
    const accessToken = await authServices.reIssueAccessToken(refreshToken);

    // check if the accessToken is valid and reset cookie/x-access-token
    if (accessToken) {
      res.setHeader('x-access-token', accessToken);

      const accessCookieInfo = {
        name: 'accessToken',
        value: accessToken,
        options: {
          maxAge: 900000,
          httpOnly: true,
          path: '/',
          sameSite: true,
          secure: process.env.NODE_ENV !== 'development',
        },
      };

      // create and set cookie based on cookie info
      setCookie(res, [accessCookieInfo]);
    }

    // check if the reissued token is valid
    const { decoded } = jwtVerify(
      accessToken as string,
      'access_token_public_key'
    );

    if (!decoded) {
      throw { ...Error, name: 'UnauthorizedError' };
    }

    return res.status(200).json(decoded);
  }

  // check if the token is valid
  if (!decoded) {
    throw { ...Error, name: 'UnauthorizedError' };
  }

  return res.status(200).json(decoded);
};

export default apiHandler({
  get: deserializeUser,
});
