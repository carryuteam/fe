import { RegisterData } from "./user";
import request from "../utils/request";

const url = {
  login: "/api/user/login",
  register: "/api/user/register"
}

export const login = async (code: string) => {
  return await request(url.login, {
    method: "POST",
    data: {
      code
    }
  })
}

export type RegisterData = {
  openid: string,
  school: string,
  grade: number,
  nickname: string,
  description: string,
  avatarUrl: string,
  gender: number
}

export const register = async (data: RegisterData) => {
  try {
    const res = await request(url.register, {
      method: "POST",
      data
    })
    return res
  } catch (e) {
    throw(e)
  }
  
}