import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[PassportModule, UserModule,
  JwtModule.register({
    signOptions: {expiresIn:'1d'},
    secret: 'secretJWT',
  })],
  providers: [AuthService, AuthResolver, AuthStrategy, JwtStrategy]
})
export class AuthModule {}
