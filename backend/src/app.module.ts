import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { UsersModule } from './users/users.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Profile],
      synchronize: true,
    }),
    ProfilesModule,
    UsersModule,
    SeedModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.run();
    console.log('✅ Dados mockados inseridos com sucesso!');
  }
}
