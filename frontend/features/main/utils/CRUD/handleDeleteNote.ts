import axios from "axios";

export default async function handleDeleteNote(id: string) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api";

    const response = await axios.delete(
      `${url}/notes/${id}`,
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
      error: error.response?.data?.message || "Failed to delete note",
    };
  }
}
