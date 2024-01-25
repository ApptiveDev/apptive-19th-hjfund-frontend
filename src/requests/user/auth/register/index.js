import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user/auth/register";

export const RegisterErrors = {
  INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  UNKNOWN: "UNKNOWN",
};

export async function postRegister({ email, name, password }) {
  if (!email || !name || !password) {
    return RegisterErrors.INVALID_ARGUMENTS;
  }

  const res = await axios
    .post(ENDPOINT, {
      email,
      name,
      password
    })
    .catch((e) => e.response ?? { status: 500 });

  return new Promise((resolve, reject) => {
    switch (res.status) {
      case 200:
        resolve(false);
        break;
      case 409:
        reject(RegisterErrors.EMAIL_ALREADY_EXISTS);
        break;
      default:
        reject(RegisterErrors.UNKNOWN);
        break;
    }
  });
}
