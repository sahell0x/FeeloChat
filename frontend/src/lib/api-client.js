import axios from "axios";
import { HOST } from "@/util/constants.js";

const apiClient = axios.create({
    baseURL : HOST,
});