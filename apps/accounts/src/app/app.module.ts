
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgModule } from './org/org.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://127.0.0.1:27017/rbac'),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'super_cool_user_name',
      password: 'super_secret_123',
      database: 'rbac',
      models: [],
    }),
    OrgModule,
    SiteModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}