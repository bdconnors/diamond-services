import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsObject } from "class-validator";

export class RoleDto {

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsObject()
  permissions: string[];
}