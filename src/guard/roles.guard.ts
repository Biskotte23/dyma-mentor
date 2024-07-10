import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_DECORATOR_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Roles Guard');
    const requiredRoles = this.reflector.getAllAndOverride(
      ROLES_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('Required roles:', requiredRoles);

    if (!requiredRoles) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];
    return requiredRoles.some((role) => role === user?.role);
  }
}
