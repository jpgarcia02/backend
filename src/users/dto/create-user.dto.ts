import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
            example: 'Juan Pérez',
            description: 'Nombre completo del usuario',
        })
        @IsNotEmpty()
        @IsString()
        @Length(2,50)
        
        name: string;
    
        @ApiProperty({
            example: 'juanperez@example.com',
            description: 'Correo electrónico único del usuario',
        })
        @IsEmail()
        email: string;
    
        @ApiProperty({
            example: '********',
            description: 'Contraseña cifrada del usuario',
        })
        @IsNotEmpty()
        @IsString()
        @Length(2,100)
        password: string;
    
        



}
