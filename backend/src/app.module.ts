import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { UsersModule } from './users/users.modules';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Profile],
      synchronize: true,
    }),
    UsersModule,
    ProfilesModule,
    SeedModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private seed: SeedService) {}

  async onModuleInit() {
    await this.seed.run();
  }
}
