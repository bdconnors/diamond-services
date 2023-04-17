import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from '@diamond/encryption';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    protected readonly users: UserService,
    protected readonly encryption: EncryptionService,
    protected readonly jwt: JwtService
  ){}

  async verify(token: string) {
    try {
      return await this.jwt.verifyAsync(token, { secret: process.env.SECRET });
    } catch {
      throw new UnauthorizedException();
    }
  }
  async login(email: string, password: string) {
    try {
      let success = false;
      const user = await this.users.getByEmail(email);
      if(user) { 
        success = await this.encryption.validate(password, user.password);
      }
      if(!success) { throw new UnauthorizedException()};
      return await this.jwt.signAsync({ user: user, sub: user.id });
    } catch(e){
      console.log(e);
      throw e;
    }
  }

}
