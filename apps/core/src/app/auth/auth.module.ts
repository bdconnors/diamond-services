import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionModule } from '@diamond/encryption';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserCollection, UserModule } from '@diamond/mongo';

@Module({
  imports: [
    EncryptionModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRES },
    }),
  ],
  providers: [
    AuthService
  ],
  controllers: [
    AuthController
  ],
  exports: [
    AuthService
  ]
})
export class AuthServiceModule {}
