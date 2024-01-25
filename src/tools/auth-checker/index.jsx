import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";


export default function useAuthChecker(fallback) {
  const cookieList = cookies();

  if (process.env.NODE_ENV === "production") {
    const token = cookieList.get("token")?.value;
    if (!token) return redirect(fallback ?? "/login");
  }
}