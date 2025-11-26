import { Request, Response } from "express";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import bcrypt from "bcrypt";

const sendCookie = (res: Response, user: any) => {
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // only week 🙂
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ message: "Email alredy exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, name, password: hash });

  sendCookie(res, user);

  return res.status(201).json({ message: "📒 Registered successfully" });
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

  sendCookie(res, user);

  res
    .status(200)
    .json({ message: `👋 welcome back ${user.name} check your notes` });
};
