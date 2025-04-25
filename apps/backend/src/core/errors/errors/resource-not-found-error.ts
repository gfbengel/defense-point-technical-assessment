import { UseCaseError } from '@core/errors/use-case-error'

import { ErrorCodesEnum } from '../error-codes-enum'


export class ResourceNotFoundError extends UseCaseError {
  code: ErrorCodesEnum = ErrorCodesEnum.RESOURCE_NOT_FOUND
  params?: any[] | undefined
  constructor() {
    super('Resource not found')
  }
}
