import { redirect } from "next/dist/server/api-utils";
import { cookies, headers } from "next/headers";

export default function useAuthChecker({ fallback, noRedirect } = {}) {
  const cookieList = cookies();
  const headerList = headers();

  const redirect = headerList.get("x-next-url");

  if (process.env.NODE_ENV === "production") {
    const token = cookieList.get("token")?.value;
    if (!token)
      return redirect(
        fallback ?? "/login" + (!noRedirect ? "?redirect=" + redirect : "")
      );
  }
}
