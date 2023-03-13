import { Controller, Get, Param } from '@nestjs/common';
import { type } from 'os';
import { AppDto } from './app.dto';

import { AppService } from './app.service';

@Controller('/content')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**@Get('/nav')
  async getNav() {
    return await this.appService.GetNav();
  }

  @Get('/theme')
  async getTheme() {
    return await this.appService.GetTheme();
  }

  @Get('/logo')
  async getLogo() {
    return await this.appService.GetLogo();
  }

  @Get('/pages')
  async getPages() {
    return await this.appService.GetPages();
  }

  @Get('/pages/:name')
  async getPage(@Param('name') name: string) {
    return await this.appService.GetPage(name);
  }**/

  @Get(':appId')
  async getAppContent(@Param('appId') appId: string): Promise<AppDto> {
    return await this.appService.GetAppContent(appId);
  }
}
