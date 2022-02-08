import { AnyZodObject } from 'zod';

// zod will validate the req content using the schemas and pass to the next
// middleware if the content is valid else will return error response
export const validateResource = (data: unknown, schema: AnyZodObject) => {
  try {
    schema.parse(data);
  } catch (error: any) {
    const message = error.issues.map((issue: any) => {
      return { path: issue.path[1], message: issue.message };
    });

    throw { name: 'ValidationError', message };
  }
};

export type ValidateResource = typeof validateResource;
