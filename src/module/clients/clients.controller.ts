import { ClientRequest } from './clients.dto'
import { ClientsService } from './clients.service'
import { Controller, Post, Get, Body, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common'

@Controller('api/v1/clients')
export class ClientsController {
    constructor(private clientsService: ClientsService) {}

    @Get()
    async index() {
        return await this.clientsService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(@Body() clientRequest: ClientRequest) {
        await this.clientsService.create(clientRequest)
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.clientsService.findOne(id)
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Param('id') id: string, @Body() clientRequest: ClientRequest) {
        await this.clientsService.update(id, clientRequest)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id') id: string) {
        await this.clientsService.delete(id)
    }

    @Post(':id/locations')
    async storeLocation(@Param('id') id: number, @Body() locationRequest: any) {
        await this.clientsService.createLocation(id, locationRequest)
    }

    @Post(':id/users')
    @HttpCode(HttpStatus.CREATED)
    async storeUser(@Param('id') id: number, @Body() userRequest: any) {
        return await this.clientsService.createUser(id, userRequest)
    }
}
