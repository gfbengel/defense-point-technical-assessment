import { UseCaseError } from '@core/errors/use-case-error'

import { ErrorCodesEnum } from '../error-codes-enum'

export class NotAllowedError extends UseCaseError {
  code: ErrorCodesEnum = ErrorCodesEnum.NOT_ALLOWED
  params?: any[] | undefined
  constructor() {
    super('Not allowed')
  }
}
