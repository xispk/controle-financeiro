import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const hostUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const res = await fetch(`${hostUrl}/api/users/me`, {
    credentials: 'include',
    headers: req.headers,
  });

  if (res.status !== 200) {
    return NextResponse.redirect(`${hostUrl}/auth/login`);
  }
};
