import { BadRequestException, Catch, ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { ExceptionFilter } from "@nestjs/common"


import { NotAllowedError } from "@/core/errors/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { UseCaseError } from "@/core/errors/use-case-error"


const ERROR_EXCEPTION_MAP = {
  [ResourceNotFoundError.name]: NotFoundException,
  [NotAllowedError.name]: ForbiddenException,
}


@Catch(
  UseCaseError,

  ResourceNotFoundError,
  NotAllowedError,
)
export class UseCaseErrorFilter implements ExceptionFilter {
  catch(exception: UseCaseError) {


    // If it's not a UseCaseError, it's an internal server error
    if (!(exception instanceof UseCaseError)) {
      throw new InternalServerErrorException({
        error: {
          message: 'Internal server error',
          code: 'INTERNAL_SERVER_ERROR',
          params: [exception]
        }
      })
    }

    // If it's a UseCaseError but not in our map, it's a bad request
    const ExceptionClass = ERROR_EXCEPTION_MAP[exception.constructor.name] || BadRequestException

    throw new ExceptionClass({
      error: {
        message: exception.message,
        code: exception.code,
        params: exception.params,
      }
    })
  }
}
