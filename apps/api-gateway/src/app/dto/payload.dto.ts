import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class PayloadDto {
  @ApiProperty()
  @IsObject()
  content: any;
}