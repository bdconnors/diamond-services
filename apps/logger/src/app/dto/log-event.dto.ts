import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LogEventDto {
  @ApiProperty()
  @IsString()
  method: string;

  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  data: any;
}