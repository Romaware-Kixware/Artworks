import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Currency } from 'src/currency/currency.entity';
import { GroupType } from 'src/groups/entities/group-type.entity';
import { Group } from 'src/groups/entities/group.entity';
import { GroupedPainting } from 'src/groups/entities/grouped-painting.entity';
import { Painting } from '../paintings/painting.entity';

export default class TypeormConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      schema: configService.get('DB_SCHEMA'),
      entities: [Painting, Group, GroupedPainting, GroupType,Currency],
      synchronize: false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeormConfig.getOrmConfig(configService),
};
