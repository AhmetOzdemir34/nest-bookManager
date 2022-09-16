import { Controller, UseGuards, Post, Request, Param, Get, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CommentService } from './comment.service';

@Controller('comment')
@UseGuards(AuthenticatedGuard)
export class CommentController {
    constructor(private commentService:CommentService){}

    @Post(':id') // book id
    async createComment(@Request() req, @Param('id') id) : Promise<any>{
        
        const dto = {
            owner: req.user._id,
            ...req.body,
            book: id
        }

        return this.commentService.createComment(dto);
    }

    @Get()
    async getAllCommentsOfUser(@Request() req) : Promise<any> {
        return this.commentService.getAllCommentsOfUser(req);
    }

    @Get(':id') // book id
    async getAllCommentsOfBook(@Param('id') id) : Promise<any> {
        return this.commentService.getAllCommentsOfBook(id);
    }

    @Delete(':id')
    async delComment(@Param('id') id, @Request() req) : Promise<any> {
        return this.commentService.delComment(id, req);
    }
}
