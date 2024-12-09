import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UserService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {

	constructor(
		/**
			 * injecting jwt service
			 */
		private readonly jwtService: JwtService,
		/**
		 * injecting jwt config
		 */
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

		/**
		* injecting generateTokensProvider service
		*/
		private readonly generateTokensProvider: GenerateTokensProvider,
		/**
				* Inject users service
			*/
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,

	) { }

	public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
		try {

			//verify token
			const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
				refreshTokenDto.refreshToken, {
				secret: this.jwtConfiguration.secret,
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
			})

			const user = await this.userService.findUserById(sub);

			// make new access token
			return await this.generateTokensProvider.generateTokens(user)

		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}
}
