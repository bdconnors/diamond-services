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
import { UserType } from '@diamond/mongo';


export const USER_TYPE_KEY = "usertypes";
export const User = (...types: UserType[]) => SetMetadata(USER_TYPE_KEY, types);

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const types = this.reflector.getAllAndOverride(USER_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!types ) { return true; }

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
      return types.includes(payload.user.type);

    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
