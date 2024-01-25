import { API_URL } from "@/requests";
import axios from "axios";

const ENDPOINT = API_URL + "/stock/stocks";

export const StockErrors = {
  UNKNOWN: "UNKNOWN",
};

export async function getStocks() {
  const res = await axios
    .get(ENDPOINT)
    .catch((e) => e.response ?? { status: 500 });

  return new Promise((resolve, reject) => {
    if (res.status === 200) {
      resolve(res.data.stocks);
    } else {
      reject(StockErrors.UNKNOWN);
    }
  });
}
