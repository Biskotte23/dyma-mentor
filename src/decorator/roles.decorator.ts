import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/interfaces/role';

export const ROLES_DECORATOR_KEY = 'roles';

export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_DECORATOR_KEY, roles);
};
