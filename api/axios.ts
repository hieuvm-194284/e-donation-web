import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';

const API_URL = process.env.API_URL;

export const request = axios.create({
  baseURL: API_URL,
});

const handleError = async (error: AxiosError) => {
  return Promise.reject(error?.response || error);
};

const handleSuccess = async (res: AxiosResponse) => {
  return res.data;
};

const handleRequest = async (config: InternalAxiosRequestConfig<any>) => {
  const requestConfig = config;
  return requestConfig;
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(handleRequest, (error) => Promise.reject(error));
