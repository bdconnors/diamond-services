import { OrgRole, SiteRole, UserType } from "@diamond/mongo";
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
  password: string;

  @ApiProperty()
  type: UserType;

  @ApiProperty()
  orgRole: OrgRole;

  @ApiProperty()
  siteRoles: SiteRole[]
}