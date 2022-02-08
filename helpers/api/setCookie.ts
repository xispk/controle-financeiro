import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

interface CookieInfo {
  name: string;
  value: unknown;
  options: CookieSerializeOptions;
}

// takes cookie key, value, options and set a cookie
export const setCookie = (res: NextApiResponse, cookieInfo: CookieInfo[]) => {
  const cookies = cookieInfo.map((info) => {
    const { name, value, options } = info;

    // convert the value to string
    const stringValue =
      typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

    // set the expires option based on the maxAge
    // if (options.maxAge) {
    //   options.expires = new Date(Date.now() + options.maxAge);
    //   options.maxAge /= 1000;
    // }

    // creates a cookie
    return serialize(name, stringValue, options);
  });

  // set the cookies array to the headers
  res.setHeader('Set-Cookie', cookies);
};
