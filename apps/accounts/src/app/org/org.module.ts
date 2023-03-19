
import { Module } from '@nestjs/common';
import { OrgRepository } from './org.repository';
import { Org } from '@diamond/data';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgController } from './org.controller';

@Module({
  imports: [SequelizeModule.forFeature([Org])],
  controllers: [OrgController],
  providers: [OrgRepository],
  exports:[OrgRepository]
})
export class OrgModule {}