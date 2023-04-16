import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddRoleDto {
  
  @ApiProperty()
  @IsString()
  siteId: string;

  @ApiProperty()
  @IsString()
  roleId: string;
}