import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
    import { IsBoolean,  IsNotEmpty, IsOptional, IsString, Length, } from "class-validator";
    

export class CreateTaskDto {


    
    
    
        @ApiProperty({
                example: 'Lavar el carro',
                description: 'Es el nombre de la tarea',
            })
            @IsNotEmpty()
            @IsString()
            @Length(2,100)
            title: string;
        
            @ApiProperty({
                example: 'Tengo que lavar el carro a las 10 pm',
                description: 'Descripcion de la tarea a realizar',
            })
            @IsString()
            @Length(2,10000)
            @IsOptional()
            description: string;

            
            @ApiPropertyOptional({
            example: false,
            description: 'Indica si la tarea está completada',
            })
            @IsBoolean()
            @IsOptional()
            completed?: boolean;
        
           
        
            
    
    
    
    }
    

