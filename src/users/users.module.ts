import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Module({
    controllers: [UsersController],
    providers: [
        UserService,
        UsersCreateManyProvider,
        CreateUserProvider,
        FindUserByEmailProvider,
    ],
    exports: [UserService], //to use this service in other modules -- WE export user service
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature(([User])),
        ConfigModule.forFeature(profileConfig), //to access env for users only
    ]
})
export class UsersModule { }
