import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}), 
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bookManager'),
    BookModule,
    AuthModule,
    CommentModule
  ],
  providers: [],
})
export class AppModule {}
