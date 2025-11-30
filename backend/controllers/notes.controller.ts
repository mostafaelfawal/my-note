import { Request, Response } from "express";
import Note from "../models/note.model";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await Note.find({ user: req.user?.id });
  res.status(200).json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    user: req.user?.id,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
};

export const getNote = async (req: Request, res: Response) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user?.id });
  res.status(200).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      user: req.user?.id,
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Note updated was successfully.", note: note });
};

export const deleteNote = async (req: Request, res: Response) => {
  await Note.findByIdAndDelete({
    _id: req.params.id,
    user: req.user?.id,
  });
  res.status(200).json({ message: "Note deleted was successfully." });
};
