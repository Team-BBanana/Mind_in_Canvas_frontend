import axios from "axios";
import userApi from "@/api/user.api";
import kidApi from '@/api/kid.api';



export const CanvasClient = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials :true
})


const API = {
    userApi,
    kidApi,
};

export default API;