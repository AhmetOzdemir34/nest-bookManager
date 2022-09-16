import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsAlphanumeric,
    IsOptional,
    IsNotEmpty
} from 'class-validator';

export class UserCreateDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(21)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(48)
    @IsString()
    password: string;
}

export class UserUpdateDto {
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(21)
    username ?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email ?: string;

    @IsOptional()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(48)
    @IsString()
    password ?: string;
}