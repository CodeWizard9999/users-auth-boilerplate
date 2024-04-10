import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/hash';
import { UserRole } from './types/enum';
import { PlayerProfileEntity } from './entities/player_profile.entity';
import { AdminProfileEntity } from './entities/admin_profile.entity';
import { S3Service } from '../s3/s3.service';
import { UserRepository } from './user.provider';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateAdminData, CreatePlayerData } from './types/interface';
import { UpdateUserPasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    @Inject('ADMIN_PROFILE_REPOSITORY')
    private readonly adminProfileRepository: Repository<AdminProfileEntity>,
    @Inject('PLAYER_PROFILE_REPOSITORY')
    private readonly playerProfileRepository: Repository<PlayerProfileEntity>,
    private readonly s3Service: S3Service,
  ) {}

  public async registerUser(
    file: Express.Multer.File,
    registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    const { username, password, gender } = registerUserDto;

    const existedUser = await this.userRepository.getUserByUsername(username);

    if (existedUser)
      throw new ForbiddenException('User with this username already exists.');

    const hashedPassword = await hashPassword(password);

    const fileLink = await this.s3Service.addFile(file);

    const { player_profile, admin_profile } = registerUserDto;

    const isAdmin = !!admin_profile;

    const { id: profileId } = isAdmin
      ? await this.adminProfileRepository.save({
          ...admin_profile,
        })
      : await this.playerProfileRepository.save({
          ...player_profile,
        });

    const userData: CreateAdminData | CreatePlayerData = {
      password: hashedPassword,
      username,
      gender,
      role: isAdmin ? UserRole.ADMIN : UserRole.PLAYER,
      ...(isAdmin
        ? { admin_profile_id: profileId }
        : { player_profile_id: profileId }),
      avatar_link: fileLink,
    };

    const savedUser = await this.userRepository.save(userData);

    return this.userRepository.getUserById(savedUser?.id);
  }

  public async updateUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<string> {
    const { id } = updateUserPasswordDto;
    const user = await this.userRepository.getUserById(id);

    if (user) throw new NotFoundException('User not found.');

    const password = await hashPassword(updateUserPasswordDto.password);

    await this.userRepository.update({ id }, { password });

    return id;
  }

  public async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
