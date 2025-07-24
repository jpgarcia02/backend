// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // 1) Hacemos global el ConfigModule para leer .env desde cualquier módulo
    ConfigModule.forRoot({ isGlobal: true }),

    // 2) Conexión a PostgreSQL con TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // 3) Módulos de la aplicación
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
