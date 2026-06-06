// JWT Auth Guard: This is a "gatekeeper" for your routes.
// Add @UseGuards(JwtAuthGuard) to any controller method to require a valid JWT token.
// If the token is missing or invalid, the request is automatically rejected with 401 Unauthorized.

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
