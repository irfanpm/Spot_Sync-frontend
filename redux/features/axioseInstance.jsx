import axios from "axios";
import { getCookie } from "cookies-next";
const cookie = getCookie("token");
const admincookie=getCookie('admintoken')

 
  export const axiosInstance=axios.create({
    baseURL:"https://spot-syncbackend.onrender.com",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  })
  export const adminaxiosInstance=axios.create({
    baseURL:"https://spot-syncbackend.onrender.com",
    headers: {
      Authorization: `Bearer ${admincookie}`,
    },
  })

