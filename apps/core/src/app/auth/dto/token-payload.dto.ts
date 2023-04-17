import { User } from "@diamond/mongo";

export class TokenPayloadDto {
  user: User;
  sub: string
}