import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AppService {
  
  constructor(
    @Inject('ORG_SERVICE') private orgs: ClientProxy,
    @Inject('SITE_SERVICE') private sites: ClientProxy,
    @Inject('USER_SERVICE') private users: ClientProxy,
    @Inject('AUTH_SERVICE') private auth: ClientProxy,
  ){}

  async orgMessage(cmd: string, data?: any) {
    const payload = data ? data : {};
    const msg = await this.orgs.send(cmd, payload);
    return msg;
  }

  async siteMessage(cmd: string, data?: any) {
    const payload = data ? data : {};
    const msg = await this.sites.send(cmd, payload);
    return msg;
  }

  async userMessage(cmd: string, data?: any) {
    const payload = data ? data : {};
    const msg = await this.users.send(cmd, payload);
    return msg;
  }

  async authMessage(cmd: string, data?: any) {
    const payload = data ? data : {};
    const msg = await this.auth.send(cmd, payload);
    return msg;
  }
}
