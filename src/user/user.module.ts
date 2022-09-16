import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/book/Schemas/book.schema';
import { Comment, CommentSchema } from 'src/comment/Schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService
  ]
})
export class UserModule {}
