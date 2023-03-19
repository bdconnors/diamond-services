import { Global, Module } from '@nestjs/common';
import { BCryptService } from './BCryptService';

@Global()
@Module({
  providers: [BCryptService],
  exports: [BCryptService],
})
export class BCryptModule {}