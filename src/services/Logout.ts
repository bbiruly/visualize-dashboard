import { api } from "@/constant/constant"
import axios from "axios"

export const logoutUser = async()=>{
    try {
        const response = await axios.get(`${api}/auth/logout`, {
            withCredentials: true
        })
        return response
    } catch (error) {
        console.log(error, "something went wrong")
    }
}