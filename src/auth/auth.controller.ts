import { Auth } from './decorator/auth.decorator';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-types.enum';
import { AuthService } from './providers/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK) //change status code for post request
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto)
    }
}
