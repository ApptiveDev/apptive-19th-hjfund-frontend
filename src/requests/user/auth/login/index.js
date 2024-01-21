import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user/auth/login";

export const LoginErrors = {
  INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNKNOWN: "UNKNOWN",
}

export async function POST({ email, password }) {
  if (!email || !password) {
    return LoginErrors.INVALID_ARGUMENTS;
  }

  const res = await axios.post(ENDPOINT, {
    email,
    password,
  }).catch((e) => e.response ?? { status: 500 });

  switch (res.status) {
    case 200:
      return false;
    case 401:
      return LoginErrors.INVALID_CREDENTIALS;
    default:
      return LoginErrors.UNKNOWN;
  }
}
