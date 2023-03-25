import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async encrypt(plainTxt: string) {
    return await bcrypt.hash(plainTxt, 10);
  }

  async validate(plainTxt: string, hash: string) {
    return await bcrypt.compare(plainTxt, hash);
  }
}