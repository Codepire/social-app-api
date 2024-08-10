import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        return req.user;
    }
}
