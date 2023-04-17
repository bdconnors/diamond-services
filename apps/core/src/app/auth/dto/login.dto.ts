import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class LoginReqDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string; 
}
export class LoginResDto {
  @ApiProperty()
  @IsString()
  token: string
}
