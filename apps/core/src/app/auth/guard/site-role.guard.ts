import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SetMetadata } from "@nestjs/common";
import { UserRole } from '@diamond/mongo';


export const SITE_ROLES_KEY = "siteroles";
export const SiteRole = (...roles: UserRole[]) => SetMetadata(SITE_ROLES_KEY, roles);

@Injectable()
export class SiteRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride(SITE_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) { return true; }

    const request = context.switchToHttp().getRequest();
    console.log(request);
    const siteId = request.params.siteId;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      console.log(payload.user);
      console.log(payload.user.orgRole.role.title);
      console.log(siteId);
      const siteRole = payload.user.siteRoles.find((sr)=>sr.siteId === siteId);
      console.log(siteRole);
      const hasRole = roles.includes(siteRole.role);
      return siteRole && hasRole;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
