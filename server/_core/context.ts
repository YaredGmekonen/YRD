import type { Request, Response } from "express";

export interface Context {
  req?: Request;
  res?: Response;
  user?: any;
}

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<Context> {
  return {
    req,
    res,
    user: null,
  };
}
