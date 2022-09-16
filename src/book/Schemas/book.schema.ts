import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/Schemas/user.schema';
import { Comment } from 'src/comment/Schemas/comment.schema';

export type BookDocument = Book & Document;

@Schema({
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})
export class Book {
  @Prop({required:true, trim:true, minlength:3, maxlength:32, lowercase:true})
  bookName: mongoose.Schema.Types.String;

  @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({required:true, trim:true})
  author: mongoose.Schema.Types.String;

  @Prop({required:true})
  pageCount: mongoose.Schema.Types.Number;

  @Prop({default: Date.now()})
  createdAt: mongoose.Schema.Types.Date;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]})
  comments: Comment[];
}

const BookSchema = SchemaFactory.createForClass(Book);


BookSchema.virtual('commentCount').get(function(){
  return this.comments.length;
})

BookSchema.virtual('pointAverage').get(function(){
  let pointAVG = 0;
  let counter = 0;
  this.comments.forEach((e:Comment)=>{
    pointAVG += Number(e.point);
    counter++;
  });
  return pointAVG;
})

export {BookSchema}