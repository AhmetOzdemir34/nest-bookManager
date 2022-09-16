import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { User, UserDocument } from './Schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {UserCreateDto, UserUpdateDto} from './user.dto';
import * as bcrypt from 'bcrypt';
import { Comment, CommentDocument } from 'src/comment/Schemas/comment.schema';
import { Book, BookDocument } from 'src/book/Schemas/book.schema';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
        ) {}

    async create(userCreateDto: UserCreateDto): Promise<any>{
        try{
            userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
            const user = await this.userModel.create(userCreateDto);
            await user.save();

            return user;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findById(id:string) : Promise<any> {
        try{
            const user = await (await this.userModel.findById(id)).populate('books');

            if(!user){
                throw new BadRequestException();
            }
            return user;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByIdAuth(id:string) : Promise<any> {
        try{
            const user = await this.userModel.findById(id);

            if(!user){
                throw new BadRequestException();
            }
            return user;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByUsername(username:string): Promise<any>{
        try{
            const user = await this.userModel.findOne({
            username
            });
            if(!user){
                throw new BadRequestException();
            }
            return user;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() : Promise<any> {
        const users = await this.userModel.find();

        return users;
    }

    async updateUser(id:string, userUpdateDto: UserUpdateDto) : Promise<any> {
        try{
            const user = await this.userModel.findByIdAndUpdate(id, userUpdateDto)
            await user.save();
            return user._id;
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(id:string, req) : Promise<any> {

        if(req.user.id != id){
            throw new HttpException('You are not enabled to delete the user.', HttpStatus.FORBIDDEN);
        }

        const deleted = await this.userModel.findByIdAndDelete(id);
        
        return deleted;
    }
}
