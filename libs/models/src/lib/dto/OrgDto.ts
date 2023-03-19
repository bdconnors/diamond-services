import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class OrgDto {
  @ApiProperty()
  @IsString()
  name: string;
}