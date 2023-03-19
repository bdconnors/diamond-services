
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgModule } from './org/org.module';
import { SiteModule } from './site/site.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb://127.0.0.1:27017/rbac'),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Body585Armor@#',
      database: 'rbac',
      models: [],
    }),
    OrgModule,
    SiteModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})

export class AppModule {}