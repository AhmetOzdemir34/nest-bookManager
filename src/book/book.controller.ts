import { 
Controller,
Get, Put, Delete, Post,
UseGuards, Body, Request, Param,
BadRequestException, ForbiddenException
} from '@nestjs/common';
import { request } from 'http';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { BookService } from './book.service';

@Controller('book')
@UseGuards(AuthenticatedGuard)
export class BookController {
    constructor(private bookService:BookService){}

    @Post()
    @UseGuards(AuthenticatedGuard)
    async createBook(@Request() req, @Body() body) : Promise<any> {
        body.owner = req.user.id;
        return this.bookService.createBook(body);
    }

    @Post('name')
    async findAll(@Body() body) : Promise<any> {
        return this.bookService.findByName(body.bookName);
    }
    
    @Put(':id')
    async updateBook(@Request() req, @Body() body, @Param('id') id) : Promise<any> {
        return this.bookService.updateBook(body,id, req);
    }

    @Get()
    async booksOfOwner(@Request() req) : Promise<any>{
        return this.bookService.booksOfOwner(req);
    }

    @Delete(':id')
    async delBook(@Param('id') id, @Request() req) : Promise<any> {
        return this.bookService.delBook(id, req);
    }
}
