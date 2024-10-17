import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, PostsModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    entities: [],
    synchronize: true, //should only be used in dev mode, coz its recreated dB every time
    port: 5432,
    username: 'postgres',
    password: '1234',
    host: 'localhost',
    database: 'nestjs-blog'


  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
