import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class ValidateCredentialsReqDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string; 
}

export class ValidateCredentialsResDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}