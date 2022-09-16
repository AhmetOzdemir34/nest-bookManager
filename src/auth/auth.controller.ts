import { Controller, Post, Get, Request, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signUp(@Request() req) {
        return {
            message: 'Signed In!'
        };
    }

    @Get('sign-out')
    signOut(@Res() res: Response){
        return res.clearCookie('SESSION_KEY').json({
            message:'Sign Out!'
        });
    }
}
