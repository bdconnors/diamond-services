import { User } from "@diamond/mongo";

export class TokenPayloadDto {
  user: User;
  iss: string;
  exp: Date;
}