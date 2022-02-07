import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const hostUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const refreshCookie = req.cookies['refreshToken'];

  if (!refreshCookie) {
    return NextResponse.redirect(`${hostUrl}/auth/login`);
  }

  return NextResponse.next();
};
