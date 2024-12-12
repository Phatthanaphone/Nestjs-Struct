import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    password?: string;

    @IsInt()
    @IsNotEmpty()
    roleId: number;  // Assume roleId must be provided when creating a user

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
