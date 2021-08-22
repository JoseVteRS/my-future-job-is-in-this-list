import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';
import { SchemasEnum } from '@back/config/monodb/enums/schemas.enum';
import { JobSchema } from '@back/config/monodb/schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get(CommonEnv.DATABASE_URI),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        }
      },
      inject: [ConfigService],
    }),
    //TODO: Add Schemas
    MongooseModule.forFeature([
      { name: SchemasEnum.JOB,  schema: JobSchema },
    ])
  ],
  exports: [MongooseModule]
})
export class MongoDBModule { }
