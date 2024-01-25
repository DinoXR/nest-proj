import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Preference } from 'src/preferences/entities/preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Preference]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, PreferencesService],
})
export class UsersModule {}
