import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppDto, NavDto, PageDto, ThemeDto } from './app.dto';
import { AppFactory } from './app.factory';

@Injectable()
export class AppService {

  constructor(protected factory: AppFactory) {}

  async ContentRequest(type: string, query: string): Promise<Record<string, any>>{
    try {
      const baseURL = process.env.CMS_URL;
      const authKey = process.env.CMS_AUTH_TOKEN;
      const headers = { Authorization: `Bearer ${authKey}` };
      const url = `${baseURL}/api/${type}${query}`;
      return await axios({ method: 'GET', headers: headers, url: url });
    }catch(e){
      console.log(e);
    }
  }

  async GetSingle(type: string): Promise<Record<string, any>> {
    const result = await this.ContentRequest(type, '?populate=*');
    return result.data.data.attributes;
  }

  async GetCollection(type: string): Promise<Record<string, any>[]>  {
    const result = await this.ContentRequest(type, '?populate=*');
    return result.data.data;
  }

  async QueryCollection(col: string, query: string ): Promise<Record<string, any>[]>  {
    const result = await this.ContentRequest(col, query);
    return result.data.data;
  }

  async GetOne(col: string, query: string ): Promise<Record<string, any> | undefined>  {
    const result = await this.ContentRequest(col, query);
    return result.data.data[0]
  }

  async GetAppContent(appId: string): Promise<AppDto> {
    const query: string = `?filter[uid]=${appId}&populate[nav][populate][0]=items&populate[theme][populate][1]=colors&populate[pages][populate][2]=content&populate[logo][populate][3]=*`;
    const data: Record<string, any> = await this.GetOne('apps', query);
    return this.factory.make(data);
  }
  /**async GetNav ():Promise<NavDto> {
    const nav = await this.GetSingle('nav');
    return new NavDto(nav.orientation, nav.items);
  }
  async GetTheme ():Promise<ThemeDto> {
    const theme = await this.GetSingle('theme');
    return new ThemeDto(theme.light, theme.dark);
  }

  async GetLogo ():Promise<LogoDto> {
    const logo = await this.GetSingle('logo');
    const baseURL = process.env.CMS_URL;
    const lightURL = `${baseURL}${logo.light.data.attributes.url}`;
    const darkURL = `${baseURL}${logo.dark.data.attributes.url}`;
    return new LogoDto(lightURL, darkURL);
  }

  async GetPage (name: string):Promise<PageDto | undefined> {
    let result : PageDto | undefined;
    const query = `?filter[name]=${name}&populate=*`;
    const page = await this.GetOne('pages', query);
    result = page ? new PageDto(page.layout, page.homePage, page.name, page.content) : undefined;
    return result;
  }

  async GetPages ():Promise<PageDto[]> {
    const pages = await this.GetCollection('pages');
    return pages.map((page)=>{
      const data = page.attributes;
      return new PageDto(
        data.layout, 
        data.homePage, 
        data.name, 
        data.content
      );
    })
  }

  async GetAllContent(): Promise<ContentDto> {
    const theme = await this.GetTheme();
    const nav = await this.GetNav();
    const logo = await this.GetLogo();
    const pages = await this.GetPages();
    console.log(pages);
    console.log(pages[0].content);
    return {
      nav: nav,
      theme: theme,
      logo: logo,
      pages: pages
    }
  }**/

}
