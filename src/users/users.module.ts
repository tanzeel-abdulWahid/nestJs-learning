import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';

@Module({
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService], //to use this service in other modules -- WE export user service
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature(([User])),
        ConfigModule.forFeature(profileConfig) //to access env for users only
    ]
})
export class UsersModule { }
