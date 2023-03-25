import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AppService {
  
  constructor(
    @Inject('ORG_SERVICE') private orgs: ClientProxy,
    @Inject('SITE_SERVICE') private sites: ClientProxy,
    @Inject('USER_SERVICE') private users: ClientProxy
  ){}

  async orgMessage(cmd: string, data?: PayloadDto) {
    const payload = data ? data : {};
    const msg = await this.orgs.send(cmd, payload);
    return msg;
  }

  async siteMessage(cmd: string, data?: PayloadDto) {
    const payload = data ? data : {};
    const msg = await this.sites.send(cmd, payload);
    return msg;
  }

  async userMessage(cmd: string, data?: PayloadDto) {
    const payload = data ? data : {};
    const msg = await this.sites.send(cmd, payload);
    return msg;
  }
}
