import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './Schemas/book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { User, UserSchema } from 'src/user/Schemas/user.schema';
import { Comment, CommentSchema } from 'src/comment/Schemas/comment.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
      ],
    controllers: [BookController],
    providers: [BookService],
    exports:[BookService]
})
export class BookModule {}
