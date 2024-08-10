import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
    controllers: [AuthController],
    imports: [UserModule],
    providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
