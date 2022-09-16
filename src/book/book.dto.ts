import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
} from 'class-validator';


export class BookCreateDto {

    @IsString()
    @IsNotEmpty()
    bookName: string;

    owner: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    @IsNumber()
    pageCount: number;
}

export class BookUpdateDto {

    @IsOptional()
    @IsString()
    bookName ?: string;

    @IsOptional()
    @IsNumber()
    pageCount ?: number;
}