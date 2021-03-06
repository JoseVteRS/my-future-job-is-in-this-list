import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';
import { join } from 'path';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';

registerEnumType(JobStatusEnum, {name: 'JobStatusEnum'})

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get(CommonEnv.NODE_ENV);
        return {
          autoSchemaFile: join(__dirname, '../../schema.gql'),
          playground: isDev,
          sortSchema: true,
          debug: isDev,
          tracing: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GqlModule {}
