import axios, { AxiosError } from "axios";
import { NoteType } from "../../types/NoteType";

export default async function handleReadNotes(): Promise<{
  success: boolean;
  data?: NoteType[];
  error?: string;
}> {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL!}/api/notes`,
      {
        withCredentials: true,
      }
    );
    return { success: true, data: data.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Something went wrong" };
    }
  }
}
