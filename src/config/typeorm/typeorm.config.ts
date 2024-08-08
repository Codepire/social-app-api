import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import dataSource from 'src/database/datasource';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions():
        | Promise<TypeOrmModuleOptions>
        | TypeOrmModuleOptions {
        return { ...dataSource?.options } as TypeOrmModuleOptions;
    }
}
