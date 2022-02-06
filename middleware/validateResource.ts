import { AnyZodObject } from 'zod';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

// zod will validate the req content using the schemas and pass to the next
// middleware if the content is valid else will return error response
const validateResources =
  (schema: AnyZodObject, handler: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
      });
      return handler(req, res);
    } catch (error: any) {
      const message = error.issues.map((issue: any) => {
        return { path: issue.path[1], message: issue.message };
      });

      return res.status(400).json({ error: message });
    }
  };

export default validateResources;
