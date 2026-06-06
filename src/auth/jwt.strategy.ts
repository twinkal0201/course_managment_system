// JWT Strategy: This tells Passport HOW to validate a JWT token.
// When a request comes in with a Bearer token, this strategy:
//   1. Extracts the token from the Authorization header
//   2. Verifies it using our secret key
//   3. Returns the decoded payload (admin info)

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Tell Passport to look for the token in the "Authorization: Bearer <token>" header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject tokens that have expired
      ignoreExpiration: false,
      // The same secret used to SIGN the token must be used to VERIFY it
      secretOrKey: process.env.JWT_SECRET || 'my-super-secret-key',
    });
  }

  // This method is called after Passport validates the token successfully.
  // Whatever we return here will be available as `req.user` in controllers.
  async validate(payload: any) {
    return {
      id: payload.sub,         // 'sub' is standard JWT for subject (user id)
      email: payload.email,
      name: payload.name,
    };
  }
}
