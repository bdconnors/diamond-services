import { User } from "@diamond/mongo";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class ValidateReqDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string; 
}

export class ValidateResDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
  user?: User
}