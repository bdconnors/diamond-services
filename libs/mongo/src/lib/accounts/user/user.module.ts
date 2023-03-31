import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCollection } from "./user.collection";
import { User, UserSchema } from "./user.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    UserCollection
  ],
  exports:[
    UserCollection
  ]
})

export class UserModule {}