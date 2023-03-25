import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { AddUserDto } from './dto/add-user.dto';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';



@Controller('users')
export class AppController {

  constructor(private readonly service: AppService){}

  @MessagePattern('list')
  list(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(context);
    console.log(data);
    return this.service.getAll();
  }

  @MessagePattern('login')
  async validate(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.service.authenticate(data.email, data.password);
  }
  /**@Post()
  async addUser(@Body() dto: AddUserDto) {
    return await this.service.add(dto.orgId, dto.firstName, dto.lastName, dto.email, dto.password);
  }

  @Post('/validate') 
  async validate(@Body() dto: ValidateCredentialsReqDto ): Promise<ValidateCredentialsResDto> {
    const success: boolean = await this.service.validateCredentials(dto.email, dto.password);
    return { success: success };
  }

  @Get('/:email')
  async get(@Param('email') email: string) {
    return await this.service.getByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return await this.service.getAll();
  }

  @Put('/:id/addRole')
  async addRole(@Param('id') id: string, @Body() dto: AddRoleDto) {
    return await this.service.addRole(id, dto.siteId, dto.roleId);
  }**/
}