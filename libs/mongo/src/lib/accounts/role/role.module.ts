import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleCollection } from "./role.collection";
import { Role, RoleSchema } from "./role.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  providers: [
    RoleCollection
  ],
  exports:[
    RoleCollection
  ]
})

export class RoleModule {}