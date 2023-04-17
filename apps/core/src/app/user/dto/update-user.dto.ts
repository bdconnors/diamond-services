import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  roles?: { siteId: string, roleId: string }[]
}