import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) : Promise<any>{
        const request = await context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
} 