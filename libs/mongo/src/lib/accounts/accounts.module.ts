import { Module } from "@nestjs/common";
import { AccountsContext } from "./accounts.context";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { OrgModule } from "./org/org.module";
import { SiteModule } from "./site/site.module";
import { PermissionModule } from "./permission/permission.module";


@Module({
  imports: [
    UserModule,
    RoleModule,
    OrgModule,
    SiteModule,
    PermissionModule
  ],
  providers: [
    AccountsContext
  ],
  exports:[
    AccountsContext
  ]
})

export class AccountsModule {}