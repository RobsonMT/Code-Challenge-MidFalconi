import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Profile) private profiles: Repository<Profile>,
    @InjectRepository(User) private users: Repository<User>,
  ) {}

  async run() {
    // criar profiles
    const p1 = this.profiles.create({ id: uuid(), name: 'Admin' });
    const p2 = this.profiles.create({ id: uuid(), name: 'Customer' });
    await this.profiles.save([p1, p2]);

    // criar users
    const u1 = this.users.create({
      id: uuid(),
      firstName: 'Alice',
      lastName: 'Silva',
      email: 'alice@example.com',
      isActive: true,
      profileId: p1.id,
    });
    const u2 = this.users.create({
      id: uuid(),
      firstName: 'Bob',
      lastName: 'Souza',
      email: 'bob@example.com',
      isActive: true,
      profileId: p2.id,
    });
    await this.users.save([u1, u2]);
  }
}
