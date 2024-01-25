import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user/auth/logout";

export const LogoutErrors = {
  UNKNOWN: "UNKNOWN",
};

export async function postLogout() {
  const res = await axios
    .post(ENDPOINT, {}, { withCredentials: true })
    .catch((e) => e.response ?? { status: 500 });
  
  return new Promise((resolve, reject) => {
    switch (res.status) {
      case 200:
        resolve(false);
        break;
      default:
        reject(LogoutErrors.UNKNOWN);
        break;
    }
  });
}