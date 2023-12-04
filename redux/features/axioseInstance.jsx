import axios from "axios";
import { getCookie } from "cookies-next";
const cookie = getCookie("token");
const admincookie=getCookie('admintoken')

 
  export const axiosInstance=axios.create({
    baseURL:"http://127.0.0.1:8000",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
  export const adminaxiosInstance=axios.create({
    baseURL:"http://127.0.0.1:8000",
    headers: {
      Authorization: `Bearer ${admincookie}`,
    },
  })

