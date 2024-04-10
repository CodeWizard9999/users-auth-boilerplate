import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { split } from 'lodash';
import { Repository } from 'typeorm';
import { TokenBlackListEntity } from '../enteties/token_black_list.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('TOKEN_BLACK_LIST_REPOSITORY')
    private readonly tokenBlackListRepository: Repository<TokenBlackListEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [bearer, token] = split(authHeader, ' ');

      if (bearer !== 'Bearer' || !token)
        throw new BadRequestException('Token is required');

      const isBlackListedToked = await this.tokenBlackListRepository.findOne({
        where: { token },
      });

      if (isBlackListedToked) throw new BadRequestException('Login is expired');

      req.user = this.jwtService.verify(token);

      return true;
    } catch (err) {
      if (err instanceof BadRequestException) throw err;

      throw new UnauthorizedException('Unauthorized error');
    }
  }
}
