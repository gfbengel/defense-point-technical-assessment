
import { env } from '@lib/env'

import axios, { AxiosError, } from 'axios'
import { toast } from 'sonner'
import { ErrorCodesEnum } from '../config/error-codes-enum'



export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
})



httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error: { code: ErrorCodesEnum; params: [], message: string } }>) => {

    const errorData = error.response?.data || {
      error: {
        code: ErrorCodesEnum.DEFAULT,
        message: 'unknown error',
        params: []
      }
    };

    toast.error(`${errorData.error.code}: ${errorData.error.message}`);

    return Promise.reject(error)
  },
)
