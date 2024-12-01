import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-types.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true }, //None means public route so it will return true

  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(this.authTypeGuardMap)
    // auhtTypes from reflector
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType]; //If no authType is defined on routed,, default is protected

    // console.log("auth Type,", authTypes)

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // console.log(guards);

    let error = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err) => {
        error = err
      });

      if (canActivate) { // if none if applied,can activate is true means user can access the resoruce
        return true;
      }
    }

    // if can activate is false, return unAuth Error
    return Promise.reject(error);
  }
}
