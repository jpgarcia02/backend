import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @ApiProperty({
        example: 1,
        description: 'Identificador único del usuario (autogenerado)',
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'Juan Pérez',
        description: 'Nombre completo del usuario',
    })
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ApiProperty({
        example: 'juanperez@example.com',
        description: 'Correo electrónico único del usuario',
    })
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @ApiProperty({
        example: '********',
        description: 'Contraseña cifrada del usuario',
    })
    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @ApiProperty({
        example: '2025-07-23T11:55:36.000Z',
        description: 'Fecha de creación del registro',
    })
    @CreateDateColumn()
    createdAt: Date;
}
