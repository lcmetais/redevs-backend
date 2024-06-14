import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
    (data: string, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return data ? user?.[data] : user;
    },
);