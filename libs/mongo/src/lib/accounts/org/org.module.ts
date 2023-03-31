import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrgCollection } from "./org.collection";
import { Org, OrgSchema } from "./org.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Org.name, schema: OrgSchema }])
  ],
  providers: [
    OrgCollection
  ],
  exports:[
    OrgCollection
  ]
})

export class OrgModule {}