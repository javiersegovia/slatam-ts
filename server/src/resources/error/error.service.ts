import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client'

// We should use this service for formatting errors across the codebase
// If we are handling "field" errors (with custom validations or so) we should return
// A consistent response format to the frontend

@Injectable()
export class ErrorService {
  handleUnknownError(error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      return this.handlePrismaError(error)
    }

    throw new Error(error)
  }

  // Check Prisma Errors for reference
  // https://www.prisma.io/docs/concepts/components/prisma-client/error-reference
  handlePrismaError(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return this.handlePrismaConflictError(error)
      default:
        console.warn(
          `Not found error handler for Prisma Error Code: ${error.code}`
        )
    }

    throw new Error()
  }

  handlePrismaConflictError(error: PrismaClientKnownRequestError) {
    const data = {}

    error.meta?.['target']?.forEach((fieldName) => {
      data[fieldName] = 'Already in use. Please choose a new one'
    })

    throw new ConflictException({
      data,
      message: 'There is a conflict error.',
    })
  }
}
