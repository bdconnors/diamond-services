import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BCryptService {
  async hash(value: string) {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}