import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Roles } from '../role.enum';
import { Book } from 'src/book/Schemas/book.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON:{virtuals:true},
  toObject:{virtuals:true},
})
export class User {
  @Prop({required:true, minlength:3, trim:true, maxlength:32, unique:true})
  username: mongoose.Schema.Types.String;

  @Prop({required:true, unique:true})
  email: mongoose.Schema.Types.String;

  @Prop({required:true,})
  password: mongoose.Schema.Types.String;

  @Prop({required:true, enum:Roles, default:Roles.USER})
  role: mongoose.Schema.Types.String;

  @Prop({default: Date.now()})
  createdAt: mongoose.Schema.Types.Date;

  @Prop({required:true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]})
  books: Book[];

  @Prop({required:true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]})
  comments: Comment[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('booksCount').get(function(){
  return this.books.length;
})

export {UserSchema};