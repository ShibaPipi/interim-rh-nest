import { Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { BaseExceptionFilter } from '@nestjs/core'

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        let code: number = 500
        let message: string = 'Internal server error'

        if (exception instanceof HttpException) {
            code = exception.getStatus()
            const exceptionResponse = exception.getResponse()

            message =
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : 'message' in exceptionResponse
                    ? (exceptionResponse.message as string)
                    : 'Whoops, something went wrong...'
        }

        console.error('Global error handler:', exception)

        response.status(code).json({
            code,
            message,
            data: null
        })
    }
}
