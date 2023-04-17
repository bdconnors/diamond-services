import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionModule } from '@diamond/encryption';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EncryptionModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRES },
    }),
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
