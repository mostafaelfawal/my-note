import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import notesRouter from "./routes/notes.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRouter)
app.use("/api/notes", notesRouter)

export default app;
