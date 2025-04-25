import { ErrorCodesEnum } from './error-codes-enum'

export interface AppErrorProps {
  code: ErrorCodesEnum
  message: string
  // params?: Record<string, any>
  params?: any[]
}

export abstract class AppError extends Error implements AppErrorProps {
  abstract readonly code: ErrorCodesEnum
  abstract readonly params?: any[]

  constructor(message: string) {
    super(message)
    // Object.setPrototypeOf(this, AppError.prototype)
  }
}
