import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => res.send("Hello Mostafa"))

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
