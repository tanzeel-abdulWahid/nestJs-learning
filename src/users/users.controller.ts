import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { ApiOperation, ApiPropertyOptional, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {
    constructor(private readonly userService: UserService) { }


    // @Get('/:id?') for optional PARAM
    @Get('/:id?')
    @ApiOperation({
        summary: 'fetched specific user'
    })
    @ApiResponse({
        status: 200,
        description: 'fetched successfully'
    })
    public getUsers(@Param() getUsersParamDto: GetUsersParamDto,) {
        console.log(getUsersParamDto)
        // console.log("ID PARAMSS", id, typeof id)
        // console.log("OPT PARAM", opt)
        return this.userService.getUsers(getUsersParamDto)
    }

    @Post()
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'any description',
        example: 10
    })
    @ApiQuery({
        name: 'skip',
        type: 'number',
        required: false,
        description: 'any description',
        example: 69
    })
    public createUser(
        // only validationPipe and DefaultValueType will require a new keyword
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(1), ParseIntPipe) skip: number,
        @Body() createUserDto: CreateUserDto,
        @Headers() header: any,
        @Ip() ip: any) {
        // console.log(limit)
        // console.log(skip)
        // console.log(createUserDto instanceof CreateUserDto)
        // console.log(header)
        // console.log(ip)
        return this.userService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto
    }
}
