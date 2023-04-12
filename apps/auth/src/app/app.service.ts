import { Inject, Injectable } from '@nestjs/common';
import jwt, { Algorithm } from 'jsonwebtoken';
import { ClientRMQ } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EncryptionService } from '@diamond/encryption';
import { User } from '@diamond/mongo';
import { TokenPayloadDto } from './dto/token-payload.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('USER_SERVICE') private users: ClientRMQ,
    protected readonly encryption: EncryptionService,
  ){}

  async decode(token: string) {
    const key: string = process.env.SECRET;
    return jwt.verify(token, key);
  }
  
  async login(email: string, password: string) {
    try {
      let success = false;
      const msg = await this.users.send('find', { email: email });
      const user = await lastValueFrom(msg);
      if(user) { 
        success = await this.encryption.validate(password, user.password);
      }
      if(!success) { throw new Error('login failed');};
      return this.sign(user);
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  getExpiration() {
    const expires = new Date();
    const hours = expires.getHours() + 2;
    expires.setHours(hours);
    return expires;
  }

  getPayload(user: User): TokenPayloadDto {
    const expiration = this.getExpiration();
    const seconds = expiration.getTime() / 1000;
    const payload: TokenPayloadDto = {
      user: user,
      iss: 'auth',
      exp: seconds
    };
    return payload;
  }

  sign(user: User): string {
    const key: string = process.env.SECRET;
    const payload: TokenPayloadDto = this.getPayload(user);
    return jwt.sign(payload, key)
  }

}
