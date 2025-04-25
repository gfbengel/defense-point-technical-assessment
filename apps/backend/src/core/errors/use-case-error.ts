import { AppError } from './app-error'
import { ErrorCodesEnum } from './error-codes-enum'


export abstract class UseCaseError extends AppError {
  abstract readonly code: ErrorCodesEnum
  abstract readonly params?: any[]

  constructor(message: string) {
    super(message)
    // Object.setPrototypeOf(this, UseCaseError.prototype)
  }
}
