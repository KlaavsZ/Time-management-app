import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, JwtAuthGuard],
  exports: [UserService]
})
export class UserModule {}
