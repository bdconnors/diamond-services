import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyReqDto {
  @ApiProperty()
  @IsString()
  token: string;
}

export class VerifyResDto {
  @ApiProperty()
  @IsNotEmpty()
  data: any
}