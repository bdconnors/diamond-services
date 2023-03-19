import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserDto {
  
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  roleId: string;
}