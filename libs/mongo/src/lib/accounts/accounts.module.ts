import { Module } from "@nestjs/common";
import { AccountsContext } from "./accounts.context";
import { UserModule } from "./user/user.module";
import { OrgModule } from "./org/org.module";
import { SiteModule } from "./site/site.module";



@Module({
  imports: [
    UserModule,
    OrgModule,
    SiteModule,
  ],
  providers: [
    AccountsContext
  ],
  exports:[
    AccountsContext
  ]
})

export class AccountsModule {}