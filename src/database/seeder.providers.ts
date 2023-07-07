
import { DataSource, DataSourceOptions, DatabaseType } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
 
 
//* Load enviroment variables
const envPath = '.env'
config({ path: envPath, debug: true });
const configService = new ConfigService();
 
export default new DataSource({
  type: configService.get<DatabaseType>('DB_CONNECTION'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  migrations: [__dirname + '/seeders/*{.ts,.js}'],
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  migrationsTableName: 'migrations',
  logging: configService.get<string>('APP_ENV') == 'PROD' ? false : configService.get<boolean>('DB_LOGGING'),
} as DataSourceOptions);