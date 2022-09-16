import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './Schemas/comment.schema';
import {MongooseModule} from '@nestjs/mongoose';
import { BookModule } from 'src/book/book.module';
import { BookService } from 'src/book/book.service';
import { Book, BookSchema } from 'src/book/Schemas/book.schema';
import { User, UserSchema } from 'src/user/Schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    BookModule
  ],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
