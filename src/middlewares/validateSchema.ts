import { Request, Response, NextFunction } from "express";
import { Schema, ValidationError } from "joi";

export function validateSchema(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let validation;
    if (Array.isArray(req.body)) {
      validation = await Promise.all(
        req.body.map((element) =>
          schema.validate(element, { abortEarly: false })
        )
      );
      validation.forEach((element) => {
        if (element.error) {
          return res
            .status(422)
            .send(element.error.details.map((detail) => detail.message));
        }
      });
    } else {
      validation = schema.validate(req.body, { abortEarly: false });
      if (validation.error) {
        return res
          .status(422)
          .send(validation.error.details.map((detail) => detail.message));
      }
    }

    next();
  };
}
