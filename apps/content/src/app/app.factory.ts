import { Injectable } from '@nestjs/common';
import { AppDto, NavDto, PageDto, ThemeDto } from './app.dto';

@Injectable()
export class AppFactory {

  makeTheme(obj: Record<string, any>): ThemeDto {
    const data = obj.data.attributes;
    return new ThemeDto(data.uid, data.colors);
  }

  makeNav(obj: Record<string, any>): NavDto {
    const data = obj.data.attributes;
    return new NavDto(data.uid, data.orientation, data.items);
  }

  makePage(obj: Record<string, any>): PageDto {
    const data = obj.attributes;
    return new PageDto(
      data.uid, 
      data.name, 
      data.path, 
      data.layout, 
      data.homePage, 
      data.content
    );
  }

  make(obj: Record<string, any>): AppDto {
    const data: Record<string, any> = obj.attributes;
    const pageData: Record<string, any> = data.pages.data;
    const logoData: Record<string, any> = data.logo.data.attributes;
    const uid: string = data.uid;
    const logo: string = `${process.env.CMS_URL}${logoData.url}`;
    const nav: NavDto = this.makeNav(data.nav);
    const theme: ThemeDto = this.makeTheme(data.theme);
    const pages: PageDto[] = pageData.map((page)=>this.makePage(page));
    return new AppDto(uid, logo, nav, theme, pages);
  }
}