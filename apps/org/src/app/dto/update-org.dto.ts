import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class UpdateOrgDto {
  @ApiProperty()
  @IsString()
  name: string;
}