import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CommentCreateDto {
    
    @IsNotEmpty()
    @IsString()
    owner: string;

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    text:string;

    @IsNotEmpty()
    @IsNumber()
    point:number;

    @IsNotEmpty()
    @IsString()
    book:string;
}