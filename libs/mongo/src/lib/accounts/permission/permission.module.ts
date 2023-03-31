import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PermissionCollection } from "./permission.collection";
import { Permission, PermissionSchema } from "./permission.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])
  ],
  providers: [
    PermissionCollection
  ],
  exports:[
    PermissionCollection
  ]
})

export class PermissionModule {}