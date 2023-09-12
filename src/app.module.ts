import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthController } from './module/auth/auth.controller'
import { ClientsController } from './module/clients/clients.controller'
import { UsersController } from './module/user/users.controller'
import { AppService } from './app.service'
import { AuthModule } from './module/auth/auth.module'
import { UsersService } from './module/user/users.service'
import { UsersModule } from './module/user/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { dataSourceOptions } from './orm/data-source'
import { ExceptionFilter } from './filter/exception.filter'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ControllerReturnValueInterceptor } from './interceptor/controller-return-value.interceptor'
import { AuthService } from './module/auth/auth.service'
import { ConfigModule } from '@nestjs/config'
import { AuthGuard } from './module/auth/auth.guard'
import { ClientsService } from './module/clients/clients.service'
import { ClientsModule } from './module/clients/clients.module'
import { LocationsModule } from './module/locations/locations.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            ...dataSourceOptions,
            autoLoadEntities: true
        }),
        AuthModule,
        UsersModule,
        ClientsModule,
        LocationsModule
    ],
    controllers: [
        AppController,
        AuthController,
        ClientsController,
        UsersController
        // LocationController,
        // InterimController,
        // ScheduleController,
        // PresenceDateController,
        // FileController,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ControllerReturnValueInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        AppService,
        AuthService,
        UsersService,
        ClientsService
    ]
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
