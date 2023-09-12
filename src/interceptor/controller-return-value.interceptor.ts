import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, map } from 'rxjs'

@Injectable()
export class ControllerReturnValueInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => ({
                code: context.switchToHttp().getResponse().statusCode,
                message: 'success',
                data: data || null
            }))
        )
    }
}
