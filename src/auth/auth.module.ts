import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Cryptography } from 'src/common/utils/cryptography';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        UserModule,
        MailModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [
        AuthResolver,
        Cryptography,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
    ],
})
export class AuthModule {}
