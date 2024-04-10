import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { comparePassword } from '../../utils/hash';
import { Repository } from 'typeorm';
import { TokenBlackListEntity } from './enteties/token_black_list.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('TOKEN_BLACK_LIST_REPOSITORY')
    private readonly tokenBlackListRepository: Repository<TokenBlackListEntity>,
  ) {}

  private generateAccessToken(user: UserEntity): string {
    const { username, role, id } = user;

    return this.jwtService.sign({ username, role, id });
  }

  public async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.userService.getUserByUsername(
      loginUserDto.username,
    );

    const isValidPassword = await comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isValidPassword) throw new UnauthorizedException('Wrong password');

    return this.generateAccessToken(user);
  }

  public logout(token: string): Promise<TokenBlackListEntity> {
    return this.tokenBlackListRepository.save({ token });
  }
}
