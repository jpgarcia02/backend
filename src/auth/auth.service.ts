import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
  private readonly jwtService: JwtService,
  private readonly usersService: UsersService
) {}

    async login(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
  // 1. Validamos las credenciales con el servicio de usuarios
  const user = await this.usersService.login(loginDto);

  // 2. Creamos el payload (datos que irán dentro del token)
  const payload = { sub: user.id, email: user.email };

  // 3. Firmamos el token con JwtService usando la configuración del .env
  const token = await this.jwtService.signAsync(payload);

  // 4. Devolvemos el token al cliente
  return { accessToken: token };
}

}
