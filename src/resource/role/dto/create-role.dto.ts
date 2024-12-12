import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    NotContains,
} from '@nestjs/class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;
}

