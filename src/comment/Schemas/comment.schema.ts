import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/Schemas/user.schema';
import { Book } from 'src/book/Schemas/book.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: User;

  @Prop({required:true, maxlength:48})
  title: mongoose.Schema.Types.String;

  @Prop({required:true, maxlength:120})
  text: mongoose.Schema.Types.String;

  @Prop({required:true, min:1, max:5})
  point: mongoose.Schema.Types.Number;

  @Prop({default: Date.now()})
  createdAt: mongoose.Schema.Types.Date;

  @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'Book'})
  book: Book;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
