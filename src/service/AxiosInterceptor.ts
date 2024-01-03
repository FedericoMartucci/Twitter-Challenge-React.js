import { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies, removeLoginCookie } from "./Cookies";

export const setUpAxiosInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);

    return axiosInstance;
}

const onRequest = (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string = cookies.get('jwt');

    req.headers = { Authorization: token } as AxiosRequestHeaders

    return req;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`Request error: ${JSON.stringify(error)}`);

    return Promise.reject(error);
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
    return res;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {    
    if (error.response?.status === 401) {
        removeLoginCookie();
        window.location.href = "/sign-in";
    }
    
    console.error(`Response error: ${JSON.stringify(error)}`);

    return Promise.reject(error);
}
