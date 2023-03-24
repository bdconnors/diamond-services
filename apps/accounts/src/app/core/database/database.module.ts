
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgCollection } from './collection/org.collection';
import { PermissionCollection } from './collection/permission.collection';
import { RoleCollection } from './collection/role.collection';
import { Org, OrgSchema } from './collection/schema/org.schema';
import { Permission, PermissionSchema } from './collection/schema/permission.schema';
import { Role, RoleSchema } from './collection/schema/role.schema';
import { Site, SiteSchema } from './collection/schema/site.schema';
import { User, UserSchema } from './collection/schema/user.schema';
import { SiteCollection } from './collection/site.collection';
import { UserCollection } from './collection/user.collection';
import { DatabaseContext } from './database.context';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Org.name, schema: OrgSchema },
      { name: Site.name, schema: SiteSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: User.name, schema: UserSchema }
  
    ]),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
  ],
  providers: [
    OrgCollection,
    SiteCollection,
    RoleCollection,
    PermissionCollection,
    UserCollection,
    DatabaseContext
  ],
  exports:[
    DatabaseContext
  ]
})

export class DatabaseModule {}