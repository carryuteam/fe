import { MAIN_HOST } from '../config/index';
import Taro from "@tarojs/taro";


interface Opts {
  method?: "GET" | "POST",
  data?: any,
  header?: { [key: string]: string },
}


export default async (url: string, opts?: Opts) => {
  opts = opts || {
    method: "GET"
  };
  const method = opts.method || "GET";
  const session = Taro.getStorageSync("jwt");
  const header = {
    "Content-Type": "application/json"
  };
  if (session) {
    header["Authorization"] = `JWT ${session}`
  }
  const result = await Taro.request({
    url: `${MAIN_HOST}${url}`,
    method: method,
    data: opts.data,
    header: header
  });

  if (result.statusCode === 403) {
    Taro.redirectTo({ url: "login" });
  }

  if (result.statusCode >= 200 && result.statusCode < 300) {
    const data = result.data
    if (data.error_code === 0) {
      return data.data;
    } else {
      throw (data)
    }
  }


  throw (result)
}