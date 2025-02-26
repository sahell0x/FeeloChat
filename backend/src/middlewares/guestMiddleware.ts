import { StatusCode } from "status-code-enum";
import { Request, Response, NextFunction } from "express";
import guestTypes from "../zod-types/guestTypes.js";

const guestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const body = req.body;
  const { success } = guestTypes.safeParse(body);

  if (!success) {
    return res.status(StatusCode.ClientErrorBadRequest).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default guestMiddleware;
