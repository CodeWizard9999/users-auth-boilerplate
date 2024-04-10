import {
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Body,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterUserDto } from './dto/register-user.dto';
import { OptimizeFilePipe } from './pipes/optimize-file.pipe';
import { RegisterUserBody } from './decorators/create-user-body.decorator';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './types/enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserPasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  public async registerUser(
    @RegisterUserBody() registerUserDto: RegisterUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        exceptionFactory: (error) =>
          new BadRequestException(`Image Error: ${error}`),
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
      new OptimizeFilePipe(),
    )
    fileName: Express.Multer.File,
  ): Promise<UserEntity> {
    return this.userService.registerUser(fileName, registerUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  public async updateUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<string> {
    return this.userService.updateUserPassword(updateUserPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  public async getUser(
    @Param('username') username: string,
  ): Promise<UserEntity> {
    return this.userService.getUserByUsername(username);
  }
}
