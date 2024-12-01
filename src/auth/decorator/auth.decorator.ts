import { AuthType } from './../enums/auth-types.enum';
import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const Auth = (...authType: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authType);
