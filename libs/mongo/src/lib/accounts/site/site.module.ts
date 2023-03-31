import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SiteCollection } from "./site.collection";
import { Site, SiteSchema } from "./site.schema";



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }])
  ],
  providers: [
    SiteCollection
  ],
  exports:[
    SiteCollection
  ]
})

export class SiteModule {}