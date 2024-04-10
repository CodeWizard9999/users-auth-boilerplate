import { Controller, Post, Body, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { LogoutUserDto } from './dto/logout-user.dto';
import { TokenBlackListEntity } from './enteties/token_black_list.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Response() res: Res,
  ): Promise<Res> {
    const token = await this.authService.login(loginUserDto);

    return res.setHeader('Authorization', `Bearer ${token}`).json({ token });
  }

  @Post('/logout')
  public async logout(
    @Body() logoutUserDto: LogoutUserDto,
  ): Promise<TokenBlackListEntity> {
    return this.authService.logout(logoutUserDto.token);
  }
}
