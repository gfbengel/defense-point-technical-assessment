import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common'
import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util'
import { isValid } from 'ulidx'

export interface ParseULIDPipeOptions {
  /**
   * The HTTP status code to be used in the response when validation fails.
   */
  errorHttpStatusCode?: ErrorHttpStatusCode
  /**
   * A factory function that returns an exception object to be thrown
   * if validation fails.
   * @param error Error message
   * @returns The exception object
   */
  exceptionFactory?: (errors: string) => any
  /**
   * If true, the pipe will return null or undefined if the value is not provided.
   * @default false
   */
  optional?: boolean
}

@Injectable()
export class ParseULIDPipe implements PipeTransform<string> {
  protected options?: ParseULIDPipeOptions
  protected exceptionFactory: (errors: string) => any

  constructor(@Optional() options?: ParseULIDPipeOptions) {
    this.options = options || {}
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
      this.options
    this.exceptionFactory =
      exceptionFactory ||
      (error => new HttpErrorByCode[errorHttpStatusCode](error))
  }

  async transform(value: string, _metadata: ArgumentMetadata): Promise<string> {
    if (
      (value === null || typeof value === 'undefined') &&
      this.options?.optional
    ) {
      return value
    }
    if (!this.isULID(value)) {
      throw this.exceptionFactory(`Validation failed (ULID is expected)`)
    }
    return value
  }

  protected isULID(str: unknown): boolean {
    if (typeof str !== 'string') {
      throw this.exceptionFactory('The value passed as ULID is not a string')
    }
    return isValid(str)
  }
}
