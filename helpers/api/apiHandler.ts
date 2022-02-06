import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export { apiHandler };
// middlewares
import { connectDB, errorHandler } from 'middleware';

// the handler supports these methods
interface HandlerWithMethods {
  post?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  put?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  get?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  delete?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
}

// handler for global middlewares
const apiHandler =
  (handler: HandlerWithMethods) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLocaleLowerCase();

    // check if handler supports http method from the request
    if (!handler[method as keyof HandlerWithMethods]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      // connect to the database
      await connectDB();

      // route handler
      await handler[method as keyof HandlerWithMethods]!(req, res);
    } catch (error) {
      // if the api handler throws an error this is triggered
      errorHandler(error, res);
    }
  };
