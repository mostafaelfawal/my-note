// app.ts
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import notesRouter from "./routes/notes.routes";
import cookieParser from "cookie-parser";
import serverless from "@vendia/serverless-express";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://dot-note-frontend.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello world"));

app.use("/api", authRouter);
app.use("/api/notes", notesRouter);

// هذا لـ Vercel
export const handler = serverless({ app });

// هذا للـ local development فقط
if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => dotenv.config());
  import("./config/db").then((module) => module.default());

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}
