import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepo.create({
        id: uuid(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        isActive: dto.isActive ?? true,
        profileId: dto.profileId,
      });

      return await this.usersRepo.save(user);
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      throw error;
    }
  }

  findAll(filter?: { profileId?: string }) {
    if (filter?.profileId) {
      return this.usersRepo.find({ where: { profileId: filter.profileId } });
    }
    return this.usersRepo.find();
  }

  async findOne(id: string) {
    const u = await this.usersRepo.findOneBy({ id });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async update(id: string, dto: UpdateUserDto) {
    const u = await this.findOne(id);
    Object.assign(u, dto);
    return this.usersRepo.save(u);
  }

  async remove(id: string) {
    const u = await this.findOne(id);
    return this.usersRepo.remove(u);
  }

  async setActive(id: string, active: boolean) {
    const u = await this.findOne(id);
    u.isActive = active;
    return this.usersRepo.save(u);
  }
}
