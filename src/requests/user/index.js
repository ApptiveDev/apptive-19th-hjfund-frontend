import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/user";

export const UserErrors = {
  NOT_LOGGED_IN: "NOT_LOGGED_IN",
};

export async function getUser() {
  const res = await axios.get(ENDPOINT, { withCredentials: true }).catch(e => e.response ?? { status: 500 });

  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      resolve(res.data);
    } else {
      reject(UserErrors.NOT_LOGGED_IN);
    }
  });
}
