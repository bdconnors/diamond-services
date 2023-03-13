
export class NavDto {
  constructor(
    public uid: string,
    public orientation: 'horizontal' | 'vertical', 
    public items: Record<string, any>,
  ){}
}


export class ThemeDto {
  constructor(
    public uid: string,
    public colors: Record<string, string>,
  ){}
}

export class PageDto {
  constructor(
    public uid: string,
    public name: string,
    public path: string,
    public layout: 'Stack' | 'Grid', 
    public homePage: boolean,
    public content: Record<string, any>[]
  ){}
}

/**export class ContentDto {
  constructor(
    public nav: NavDto, 
    public theme: ThemeDto,
    public logo: LogoDto,
    public pages: PageDto[]
  ){}
}
export class LogoDto {
  constructor(
    public light: string, 
    public dark: string,
  ){}
}**/

export class AppDto {
  constructor(
    public uid: string,
    public logo: string,
    public nav: NavDto, 
    public theme: ThemeDto,
    public pages: PageDto[]
  ){}
}
