import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, //means this config module is availabe in all modules
      // envFilePath: ['.env.development'] //.env.development will work only
      envFilePath: [!ENV ? '.env' : `.env.${ENV}`.trim()], //dev me dev load krega, test me test env
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation

    }),
    TypeOrmModule.forRootAsync({ //for Async Connection -- now we can inject dependencies
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: configService.get("database.autoLoadEntities"),
        synchronize: configService.get("database.synchronize"), //should only be used in dev mode, coz its recreated dB every time
        port: configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        host: configService.get("database.host"),
        database: configService.get("database.dbname")
      })
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor() { }

}
