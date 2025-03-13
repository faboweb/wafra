import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (
    process.env.AUTHORIZATION &&
    authorization !== process.env.AUTHORIZATION
  ) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  next();
}
