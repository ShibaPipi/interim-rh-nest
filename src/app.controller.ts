import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import * as bcrypt from 'bcrypt'
import { WithoutToken } from './decorator/route-without-token.decorator'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @WithoutToken()
    getHello(): string {
        return this.appService.getHello()
    }

    @Get('test')
    @WithoutToken()
    async test(): Promise<string | void> {
        console.log(await bcrypt.hash('admin', 10))
        return
    }
}
