import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SiteDto {

  @ApiProperty()
  @IsString()
  orgId: string;
  
  @ApiProperty()
  @IsString()
  name: string;
}