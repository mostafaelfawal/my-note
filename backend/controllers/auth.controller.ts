import { Request, Response } from "express";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ message: "Email alredy exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hash });

  res.status(201).json({
    token: generateToken(user._id),
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  res.status(200).json({
    token: generateToken(user._id),
    message: "👋 welcome back check your notes",
  });
};
