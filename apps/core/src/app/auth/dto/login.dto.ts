import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginReqDto {
  
  @ApiProperty()
  @IsString()
  siteId: string;

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
