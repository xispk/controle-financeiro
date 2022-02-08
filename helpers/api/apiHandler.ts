import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export { apiHandler };

// middlewares
import { connectDB, errorHandler, validateResource } from 'middleware';
import { AnyZodObject } from 'zod';

// the handler supports these methods
interface HandlerWithMethods {
  post?: {
    handler: NextApiHandler;
    dataFrom?: 'body' | 'query' | 'headers';
    schema?: AnyZodObject;
  };
  put?: {
    handler: NextApiHandler;
    dataFrom?: 'body' | 'query' | 'headers';
    schema?: AnyZodObject;
  };
  get?: {
    handler: NextApiHandler;
    dataFrom?: 'body' | 'query' | 'headers';
    schema?: AnyZodObject;
  };
  delete?: {
    handler: NextApiHandler;
    dataFrom?: 'body' | 'query' | 'headers';
    schema?: AnyZodObject;
  };
}

// handler for global middlewares
const apiHandler =
  (methods: HandlerWithMethods) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLocaleLowerCase();
    const { handler, dataFrom, schema } =
      methods[method as keyof HandlerWithMethods]!;

    // check if handler supports http method from the request
    if (!methods[method as keyof HandlerWithMethods]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      // connect to the database
      await connectDB();

      // validate data from the request based on handler schema
      if (dataFrom && schema) {
        validateResource(req[dataFrom], schema);
      }

      // route handler
      await methods[method as keyof HandlerWithMethods]?.handler(req, res);
    } catch (error) {
      // if the api handler throws an error this is triggered
      errorHandler(error, res);
    }
  };
