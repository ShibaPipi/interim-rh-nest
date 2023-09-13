import { Controller, Delete, Param, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async show(@Param('id') id: number) {
        return await this.usersService.findOne(id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id') id: number) {
        await this.usersService.remove(id)
    }

    @Post(':id/locations')
    @HttpCode(201)
    async storeLocations(@Param('id') id: number, @Body() request: { locations: number[] }) {
        await this.usersService.storeLocations(id, request.locations)
    }

    // @Post(':id/password')
    // storePassword(
    //   @Param('id') id: string,
    //   @Body() request: { password: string },
    // ) {
    //   const user = this.authService.getUserById(id);

    //   if (!user) {
    //     // 处理用户不存在的逻辑
    //     return { message: 'User does not exist.' };
    //   }

    //   // 更新用户密码
    //   user.password = request.password;
    //   this.authService.updateUser(user);

    //   // 返回成功响应
    //   return { statusCode: 201 };
    // }

    // @Get('locations')
    // showLocations() {
    //   const authenticatedUser = this.authService.getAuthenticatedUser();

    //   if (!authenticatedUser) {
    //     // 处理未认证用户的逻辑
    //     return { message: 'User not authenticated.' };
    //   }

    //   let locations: Location[];

    //   if (authenticatedUser.type === 'admin') {
    //     // 如果是管理员用户，获取所有位置
    //     locations = this.authService.getAllLocations();
    //   } else {
    //     // 如果是普通用户，获取用户关联的位置
    //     locations = authenticatedUser.locations;
    //   }

    //   // 返回位置信息
    //   return locations;
    // }
}
