import axios from "axios";
import { NoteType } from "../../types/NoteType";

export default async function handleCreateNote({
  title,
  content,
  tags,
}: NoteType) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api";

    const response = await axios.post(
      `${url}/notes`,
      { title, content, tags },
      { withCredentials: true }
    );

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create note",
    };
  }
}
