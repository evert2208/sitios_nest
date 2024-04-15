import {IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCiudadeDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    nombre: string;

    @ApiProperty()
    @IsString()
    direccion: string;

    @ApiProperty()
    @IsString()
    barrio: string;
}
