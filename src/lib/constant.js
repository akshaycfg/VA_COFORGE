import axios from "axios";
import { env } from '../env';
var config = env.appConfig;
const defaultHeader = {
    headers: {
        "Content-Type": "application/json",
    },
};
export const API_URL = config.apiUrl;
export const httpClient = axios.create({
    baseURL: API_URL,
    headers: defaultHeader
});

export const setHeader = (header) => {
    httpClient.defaults.headers = header
};

export const setBaseURL = (baseURL) => {
    httpClient.defaults.baseURL = baseURL
};