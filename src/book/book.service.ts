import { Injectable, BadRequestException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { Book, BookDocument } from './Schemas/book.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { BookCreateDto, BookUpdateDto } from './book.dto';
import { User, UserDocument } from 'src/user/Schemas/user.schema';
import { Comment, CommentDocument } from 'src/comment/Schemas/comment.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
        ) {}

    async createBook(body: BookCreateDto) : Promise<any> {
        const book = await this.bookModel.create(body);
        const user = await this.userModel.findByIdAndUpdate(body.owner, {
            $push:{
                books: [book]
            }
        }, {new:true});
        await book.save();
        return {book, user};
    }

    async findByName(bookName:string): Promise<any> {
        bookName = bookName.toLowerCase().trim();
        const book = await this.bookModel.find({
            bookName
        });
        if(!book){
            throw new BadRequestException();
        }
        return book;
    }

    async booksOfOwner(req) : Promise<any> {
        try{
            const books = await this.bookModel.find({
                owner: req.user.id
            });
            return books;
        }catch(err){
            throw new HttpException("INTERNAL ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateBook(body:BookUpdateDto, id:string, req): Promise<any> {
        try{
            const book = await this.bookModel.findByIdAndUpdate(id, body);
            if(req.user.id != book.owner){
                throw new HttpException("You are not owner of the book.", 403);
            }       
            await book.save();
            return id;
        }catch(err){
            throw new HttpException("INTERNAL ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delBook(id, req) : Promise<any> {
        try{
            const book = await this.bookModel.findById(id);
            if(!book) {
                throw new HttpException("The Book is not found.", HttpStatus.NOT_FOUND);
            }
            if(req.user.id != book.owner){
                throw new HttpException("You are not owner of the book.", HttpStatus.FORBIDDEN);
            }

            await this.userModel.findByIdAndUpdate(req.user.id, {
                $pullAll: {
                    books:[{_id: id}]
                }
            });

            await this.commentModel.deleteMany({
                book:id
            });

            await book.delete();
            return book._id;
        }
        catch(err){
            throw new HttpException("INTERNAL ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

