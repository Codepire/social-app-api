import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'S3cretUser',
    password: 'S3cret',
    database: 'social-app',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/*.{ts,js}'],
});

console.log(__dirname);

dataSource.initialize();
export default dataSource;
