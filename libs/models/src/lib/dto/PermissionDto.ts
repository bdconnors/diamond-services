import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PermissionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}