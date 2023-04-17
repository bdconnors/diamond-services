import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}