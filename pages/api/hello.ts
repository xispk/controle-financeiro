// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { UserModel } from 'models';
import { apiHandler } from 'helpers/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await UserModel.findById('61faf0119d60f6378fe4dffb');
    console.log(user);
  } catch (error) {
    console.log(error);
  }
  res.setHeader(
    'Set-Cookie',
    serialize('auth', 'some data', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })
  );
  res.status(200).json({ name: 'John Doe' });
};

export default apiHandler({
  get: handler,
});
