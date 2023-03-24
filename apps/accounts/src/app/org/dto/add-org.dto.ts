import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddOrgDto {
  @ApiProperty()
  @IsString()
  name: string;
}