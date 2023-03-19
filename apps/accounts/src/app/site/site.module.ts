
import { Module } from '@nestjs/common';
import { SiteRepository } from './site.repository';
import { SiteModel } from '@diamond/data';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteController } from './site.controller';

@Module({
  imports: [SequelizeModule.forFeature([SiteModel])],
  controllers:[SiteController],
  providers: [SiteRepository],
  exports:[SiteRepository]
})
export class SiteModule {}