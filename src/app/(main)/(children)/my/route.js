import { redirect } from "next/navigation";

export function GET(req) {
  redirect("/my/account");
}
