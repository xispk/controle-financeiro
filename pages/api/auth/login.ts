// external dependencies
import type { NextApiRequest, NextApiResponse } from 'next';

// local dependencies
import { omit } from 'lodash';
import { jwtSign } from 'helpers/api';
import { sessionPrivateFields, userPrivateFields } from 'models';
import { authServices, userServices, accountServices } from 'services';
import { setCookie } from 'helpers/api';
import { apiHandler } from 'helpers/api';

// handler that executes the flow for user login
const createSessionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, username, password } = req.body;
  try {
    // check if there is an account with the email informed
    const account = await accountServices.findByEmail({ email });

    if (!account) {
      throw 'Password or email invalid';
    }

    // check if there is a memmber with the id informed
    const user = await userServices.findByName(username).select('+password');

    if (!user) {
      throw 'User do not exist or do not belong to the account';
    }

    // check if the account contains the member found
    if (!account.users.includes(user._id)) {
      throw 'User do not exist or do not belong to the account';
    }

    const isValid = await user.comparePasswords(password);

    // check if the passwords match
    if (!isValid) {
      throw 'Password or email invalid';
    }

    // deletes all previous sessions of this user to avoid multiple sessions
    await authServices.deleteByUser(String(user._id));

    // create session
    const session = await authServices.create(String(user._id));
    // create refreshToken
    // jwtSign payload should be a plain object. using omit to exclude private
    // fields and toJSON() to convert to plain object
    const refreshToken = jwtSign(
      omit(session.toJSON(), sessionPrivateFields),
      'refresh_token_private_key',
      'refresh_token_sign_options'
    );

    // set info for refresh token cookie
    const refreshCookieInfo = {
      name: 'refreshToken',
      value: refreshToken,
      options: {
        maxAge: 3.154e10,
        httpOnly: true,
        path: '/',
        sameSite: true,
        secure: process.env.NODE_ENV !== 'development',
      },
    };

    // create accessToken
    // jwtSign payload should be a plain object. using omit to exclude private
    // fields and toJSON() to convert to plain object
    const accessToken = jwtSign(
      omit(user.toJSON(), userPrivateFields),
      'access_token_private_key',
      'access_token_sign_options'
    );

    // set info for access token cookie
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

    setCookie(res, [refreshCookieInfo, accessCookieInfo]);

    res.status(200).json({
      message: 'Session created successfully',
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    throw error;
  }
};

export default apiHandler({
  post: createSessionHandler,
});
