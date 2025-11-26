import jwt from "jsonwebtoken";

export default function generateToken(id: object) {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
    issuer: "my-note",
  });
}
