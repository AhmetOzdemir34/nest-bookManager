import { Controller, 
    Post, Get, Put, Delete, UseGuards, Request, ForbiddenException,
    Body, Param } from '@nestjs/common';
import { request } from 'http';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async create(@Body() body) : Promise<any> {
        return this.userService.create(body);
    }

    @Get(':id')
    async getUserbyID(@Param('id') id) : Promise<any> {
        return this.userService.findById(id);
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    async getUsers(@Request() req) : Promise<any> {        
        return this.userService.findAll();
    }

    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    async updateUser(@Request() req, @Body() body, @Param('id') id) : Promise<any> {
        if(req.user._id !== id){
            throw new ForbiddenException();
        }
        return this.userService.updateUser(id,body);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    async deleteUser(@Request() req, @Param('id') id) : Promise<any> {
        if(req.user._id !== id){
            throw new ForbiddenException();
        }
        return this.userService.deleteUser(id, req);
    }

}
