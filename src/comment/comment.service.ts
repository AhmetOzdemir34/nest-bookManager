import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CommentDocument, Comment } from './Schemas/comment.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Request } from 'express';
import { CommentCreateDto } from './comment.dto';
import { Book, BookDocument } from 'src/book/Schemas/book.schema';
import { User, UserDocument } from 'src/user/Schemas/user.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
        ) {}

    async createComment(commentCreateDto: CommentCreateDto) : Promise<any> {
        try{
            const comment = await this.commentModel.create(commentCreateDto);
            await comment.save();

            const book = await this.bookModel.findByIdAndUpdate(commentCreateDto.book,{
                $push: {
                    comments: [comment],
                }
            }, {new:true});

            const user = await this.userModel.findByIdAndUpdate(commentCreateDto.owner,{
                $push: {
                    comments: [comment],
                }
            }, {new:true});

            return comment;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCommentsOfUser(req) : Promise<any> {
        try{
            const comments = await this.commentModel.find({
                owner: req.user._id
            });

            return comments;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCommentsOfBook(id:string) : Promise<any> {
        try{
            const comments = await this.commentModel.find({
                book: id
            });

            return comments;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delComment(id:string, req) : Promise<any> {
        try{
            const comment = await this.commentModel.findById(id);
            if(req.user._id != comment.owner){
                throw new HttpException("You are not owner of the comment", HttpStatus.FORBIDDEN);
            }

            const user = await this.userModel.findByIdAndUpdate(req.user.id, {
                $pullAll: {
                    comments: [{_id:id}]
                }
            }, {new:true})

            const book = await this.bookModel.findByIdAndUpdate(comment.book, {
                $pullAll: {
                    comments: [{_id:id}]
                }
            }, {new:true});

            await comment.delete();
            return comment;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
