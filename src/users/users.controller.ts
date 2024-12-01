import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, Headers, Ip, ParseIntPipe, DefaultValuePipe, ValidationPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { ApiOperation, ApiPropertyOptional, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-types.enum';

@Controller('users')
@ApiTags("Users")
// @UseGuards(AccessTokenGuard) //To make entire comp private
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
    // @SetMetadata('key', 'None')
    // @Auth(AuthType.None) //we made custome decorator
    public createUser(
        // only validationPipe and DefaultValueType will require a new keyword
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(1), ParseIntPipe) skip: number,
        @Body() createUserDto: CreateUserDto,
        @Headers() header: any,
        @Ip() ip: any) {

        return this.userService.createUser(createUserDto);
    }

    // @UseGuards(AccessTokenGuard)
    @Post('create-many')
    @Auth(AuthType.None) //we made custome decorator
    public createManyUser(@Body() createManyUsersDto: CreateManyUsersDto) {
        return this.userService.createMany(createManyUsersDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto
    }
}
