import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user/auth/login";

export const LoginErrors = {
  INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNKNOWN: "UNKNOWN",
};

export async function postLogin({ email, password, keep }) {
  if (!email || !password) {
    return LoginErrors.INVALID_ARGUMENTS;
  }

  const res = await axios
    .post(
      ENDPOINT,
      {
        email,
        password,
        keep,
      },
      {
        withCredentials: true,
      }
    )
    .catch((e) => e.response ?? { status: 500 });
    

  return new Promise((resolve, reject) => {
    switch (res.status) {
      case 200:
        resolve(false);
        break;
      case 401:
        reject(LoginErrors.INVALID_CREDENTIALS);
        break;
      default:
        reject(LoginErrors.UNKNOWN);
        break;
    }
  });
}
