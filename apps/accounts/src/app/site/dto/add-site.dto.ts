import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class AddSiteDto {
  @ApiProperty()
  @IsString()
  orgId: string;
  
  @ApiProperty()
  @IsString()
  name: string;

}