import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // Dirección del contenedor (en Windows con Docker Desktop funciona localhost)
      port: 5433,             // Puerto mapeado en docker-compose.yml (cambia si es diferente)
      username: 'nestuser',   // Usuario que configuraste en docker-compose
      password: 'nestpassword', // Contraseña que pusiste en docker-compose
      database: 'nestdb',     // Base de datos creada en docker-compose
      autoLoadEntities: true, // Carga automática de entidades
      synchronize: true,      // Crea las tablas automáticamente (solo para desarrollo)
    }),
    UsersModule,
  ],
})
export class AppModule {}
