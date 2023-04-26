import { SiteRole, UserRole } from "@diamond/mongo";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, IsBoolean} from "class-validator";

export class AddUserDto {

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(8, 20)
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  mobileNumber?: string;

  @ApiProperty()
  @IsString()
  orgId: string;

  @ApiProperty()
  orgRole: UserRole;

  @ApiProperty()
  siteRoles?: SiteRole[]
}