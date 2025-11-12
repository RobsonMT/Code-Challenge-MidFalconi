import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(BASE_URL + path, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      ...options,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      const msg = error.message || "Erro inesperado ao comunicar com a API.";
      toast.error(msg);
      throw new Error(msg);
    }

    const data = await res.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "Falha na requisição.");
    throw error;
  }
}
