import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountsContext } from "./accounts.context";
import { OrgCollection } from "./collection/org.collection";

import { PermissionCollection } from "./collection/permission.collection";
import { RoleCollection } from "./collection/role.collection";
import { SiteCollection } from "./collection/site.collection";
import { UserCollection } from "./collection/user.collection";

import { Org, OrgSchema } from "./schema/org.schema";
import { Permission, PermissionSchema } from "./schema/permission.schema";
import { Role, RoleSchema } from "./schema/role.schema";
import { Site, SiteSchema } from "./schema/site.schema";
import { User, UserSchema } from "./schema/user.schema";


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
    AccountsContext
  ],
  exports:[
    AccountsContext
  ]
})

export class AccountsModule {}