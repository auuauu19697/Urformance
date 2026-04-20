import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 * Global API Key guard.
 *
 * Every incoming request must contain the header:
 *   X-API-Key: <value matching API_KEY in .env>
 *
 * If the key is missing or incorrect the request is rejected with 403.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const incoming = request.headers['x-api-key'] as string | undefined;
    const expected = this.config.get<string>('apiKey');

    if (!expected) {
      // API_KEY not configured — fail safe
      throw new ForbiddenException('API key not configured on the server.');
    }

    if (!incoming || incoming !== expected) {
      throw new ForbiddenException('Missing or invalid API key.');
    }

    return true;
  }
}
