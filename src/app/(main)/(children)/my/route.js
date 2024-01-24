import { redirect } from "next/navigation";

export function GET() {
  redirect("/my/account");
}
