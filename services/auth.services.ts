import { omit } from 'lodash';
import { JwtPayload } from 'jsonwebtoken';

import { jwtSign, jwtVerify } from 'helpers/api';
import { userServices } from 'services';
import { SessionModel, userPrivateFields } from 'models';

const create = (user: string) => {
  return SessionModel.create({ user });
};

const findById = (sessionId: string) => {
  return SessionModel.findById(sessionId);
};

const deleteByUser = (user: string) => {
  return SessionModel.deleteMany({ user });
};

const reIssueAccessToken = async (refreshToken: string) => {
  // check if the token is valid
  const { decoded } = jwtVerify(refreshToken, 'refresh_token_public_key');

  if (!decoded) return false;
  // check if the session is valid
  const session = await findById((decoded as JwtPayload)._id);

  if (!session || !session.valid) return false;
  // check if the user is valid

  const user = await userServices.findById(String(session.user));

  if (!user) return false;
  // reissue access token

  const accessToken = jwtSign(
    omit(user.toJSON(), userPrivateFields),
    'access_token_private_key',
    'access_token_sign_options'
  );

  return accessToken;
};

export const authServices = {
  create,
  findById,
  deleteByUser,
  reIssueAccessToken,
};
