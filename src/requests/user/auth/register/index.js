import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user/auth/register";

export const RegisterErrors = {
  INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  UNKNOWN: "UNKNOWN",
};

export async function POST({ email, name, password }) {
  if (!email || !name || !password) {
    return RegisterErrors.INVALID_ARGUMENTS;
  }

  const res = await axios
    .post(ENDPOINT, {
      email,
      name,
      password,
      role: "admin"
    })
    .catch((e) => e.response ?? { status: 500 });

  console.log(res);
  return res.status;
}
