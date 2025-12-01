import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import notesRouter from "./routes/notes.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://dot-note-front.vercel.app", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/notes", notesRouter);

export default app;
