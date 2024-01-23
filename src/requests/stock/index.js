import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/stock";

export const StockErrors = {
  INVALID_ARGUMENTS: "INVALID_ARGUMENTS",
  UNKNOWN: "UNKNOWN",
};

export async function getStock({ key = "", count = 20, index = 0 }) {
  if (
    typeof key !== "string" ||
    typeof count !== "number" ||
    typeof index !== "number"
  ) {
    return StockErrors.INVALID_ARGUMENTS;
  }

  const params = new URLSearchParams();

  params.append("key", key);
  params.append("count", count);
  params.append("index", index);

  const res = await axios
    .get(ENDPOINT + "?" + params.toString())
    .catch((e) => e.response ?? { status: 500 });

  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      resolve(res.data);
    } else {
      reject(StockErrors.UNKNOWN);
    }
  })
}
