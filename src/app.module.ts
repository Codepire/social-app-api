import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { GqlConfigService } from './config/graphql/gql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './config/typeorm/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfigService,
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeormConfigService,
        }),
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        UserModule,
        AuthModule,
    ],
    providers: [AppService, AppResolver],
})
export class AppModule {}
