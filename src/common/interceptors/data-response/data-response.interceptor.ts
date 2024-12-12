import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService
  ) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('run before execuation')
    return next.handle().pipe(tap((data) => {
      // PIPE is used to Perform side effects without changing the data.	
      // console.log("After exec", data)
    }),
      map(data => {
        // MAP IS Transform or modify the data.
        return { data: data, API_VERSION: this.configService.get('appConfig.apiVersion') }
      })
    );
  }
}
