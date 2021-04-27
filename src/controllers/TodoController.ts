import { Request, Response } from "express";

class TodoController {
  index = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ message: "oke" });
  };
}

export default new TodoController();
